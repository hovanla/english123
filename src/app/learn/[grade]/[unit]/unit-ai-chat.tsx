"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { startShortAudioRecording, type ShortAudioRecording } from "@/lib/browser-audio";
import { speakEnglish, startEnglishRecognition } from "@/lib/browser-speech";

type ChatMessage = { role: "user" | "assistant"; content: string; apiContent?: string };
type Scenario = { activityId: string; title: string; description: string };

export default function UnitAiChat({
  unitId,
  unitTitle,
  unitTheme,
  starters,
  scenarios,
  configured,
  voiceConfigured,
}: {
  unitId: string;
  unitTitle: string;
  unitTheme: string;
  starters: string[];
  scenarios: Scenario[];
  configured: boolean;
  voiceConfigured: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [listening, setListening] = useState(false);
  const [recording, setRecording] = useState(false);
  const [voiceMode, setVoiceMode] = useState(true);
  const [activeScenarioId, setActiveScenarioId] = useState<string | undefined>();
  const [error, setError] = useState("");
  const recordingRef = useRef<ShortAudioRecording | null>(null);
  const chatListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => () => recordingRef.current?.cancel(), []);

  useEffect(() => {
    if (!expanded) return;
    const chatList = chatListRef.current;
    if (!chatList) return;
    const frame = window.requestAnimationFrame(() => {
      chatList.scrollTo({ top: chatList.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [expanded, messages, pending]);

  function listenWithBrowser() {
    setListening(true);
    const supported = startEnglishRecognition(
      (transcript) => {
        setListening(false);
        if (voiceMode) void sendMessage(transcript);
        else setDraft(transcript);
      },
      () => {
        setError("Chưa nghe rõ. Em hãy thử nói lại chậm hơn.");
        setListening(false);
      },
    );
    if (!supported) {
      setError("Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Em vẫn có thể nhập câu.");
      setListening(false);
    }
  }

  async function transcribeWithGroq(audio: Blob) {
    setListening(true);
    let useBrowserFallback = false;
    try {
      const form = new FormData();
      form.append("audio", audio, `conversation.${audio.type.includes("mp4") ? "m4a" : "webm"}`);
      const response = await fetch("/api/ai/speech-to-text", { method: "POST", body: form });
      const payload = await response.json().catch(() => null) as { transcript?: string; error?: string } | null;
      if (!response.ok || !payload?.transcript) {
        if (payload?.error === "RATE_LIMITED") {
          setError("Tất cả key Groq đang đạt giới hạn. Đã chuyển sang nhận dạng của trình duyệt; em hãy nói lại.");
          useBrowserFallback = true;
        } else {
          setError("AI chưa nghe rõ đoạn này. Em hãy nói lại gần micro hơn.");
        }
        return;
      }
      if (voiceMode) await sendMessage(payload.transcript);
      else setDraft(payload.transcript);
    } catch {
      setError("Dịch vụ nhận giọng nói đang bận. Em vẫn có thể nhập câu.");
    } finally {
      setListening(false);
      if (useBrowserFallback) window.setTimeout(listenWithBrowser, 0);
    }
  }

  async function listen() {
    setError("");
    if (recording) {
      recordingRef.current?.stop();
      return;
    }
    if (!voiceConfigured) {
      listenWithBrowser();
      return;
    }
    setRecording(true);
    const controller = await startShortAudioRecording(
      (audio) => {
        recordingRef.current = null;
        setRecording(false);
        void transcribeWithGroq(audio);
      },
      () => {
        recordingRef.current = null;
        setRecording(false);
        setError("Không mở được micro. Hãy cho phép micro hoặc nhập câu bằng bàn phím.");
      },
      10_000,
    );
    recordingRef.current = controller;
    if (!controller) {
      setRecording(false);
      if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) listenWithBrowser();
    }
  }

  async function sendMessage(messageValue: string, scenarioActivityId = activeScenarioId, reset = false, displayMessage?: string) {
    const message = messageValue.trim();
    if (!message || pending || !configured) return;
    setError("");
    setPending(true);
    const previous = reset ? [] : messages;
    const history = previous.slice(-8).map(({ role, content, apiContent }) => ({ role, content: apiContent || content }));
    const userMessage: ChatMessage = { role: "user", content: displayMessage || message, apiContent: message };
    setMessages([...previous, userMessage]);
    try {
      const response = await fetch("/api/ai/unit-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId, message, history, scenarioActivityId }),
      });
      const payload = await response.json().catch(() => null) as { reply?: string; message?: string; error?: string } | null;
      if (!response.ok || !payload?.reply) {
        setError(payload?.message || (payload?.error === "AI_NOT_CONFIGURED"
          ? "Chưa cấu hình GROQ_API_KEY, NVIDIA_API_KEY hoặc OPENAI_API_KEY cho phòng hội thoại AI."
          : payload?.error === "RATE_LIMITED" ? "AI đang đạt giới hạn tạm thời. Em hãy thử lại sau một phút." : "AI đang bận. Em hãy thử lại sau."));
        return;
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.reply! }]);
      setDraft("");
      if (voiceMode) speakEnglish(payload.reply);
    } catch {
      setError("Không kết nối được với AI. Em hãy thử lại sau.");
    } finally {
      setPending(false);
    }
  }

  function startScenario(scenario: Scenario) {
    setActiveScenarioId(scenario.activityId);
    setDraft("");
    void sendMessage(
      "Start the role-play now. Speak first as the other person and ask me one short question in English.",
      scenario.activityId,
      true,
      `🎭 ${scenario.title}: ${scenario.description}`,
    );
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(draft);
  }

  return <section className="mt-4 overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
    <button type="button" onClick={() => setExpanded((value) => !value)} className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-violet-50 sm:p-5">
      <span>
        <span className="block text-xs font-black uppercase tracking-wider text-violet-700">Luyện giao tiếp theo Unit</span>
        <span className="mt-1 block text-lg font-black text-slate-950">💬 Trò chuyện nói hoặc nhắn tin · {unitTitle}</span>
        <span className="mt-1 block text-sm text-slate-600">AI đóng vai tình huống “{unitTheme}”, nghe câu của em và sửa lỗi ngắn gọn.</span>
      </span>
      <span className="shrink-0 rounded-xl bg-violet-700 px-4 py-2 text-sm font-black text-white">{expanded ? "Đóng" : "Bắt đầu"}</span>
    </button>

    {expanded && <div className="border-t border-violet-100 p-4 sm:p-5">
      <div className="rounded-xl bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-950">
        Đây là AI, có thể trả lời chưa hoàn hảo. Không nói tên thật, trường học, địa chỉ, email hoặc số điện thoại. Hội thoại và bản ghi âm không được lưu vào hồ sơ.
      </div>

      {!configured && <p className="mt-3 rounded-xl bg-slate-100 p-3 text-sm font-bold text-slate-700">
        Phòng hội thoại chưa hoạt động vì máy chủ chưa có khóa API Groq, NVIDIA hoặc OpenAI.
      </p>}

      {scenarios.length > 0 && <div className="mt-4">
        <p className="text-xs font-black uppercase tracking-wider text-violet-700">Chọn tình huống đời thực</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => <button type="button" key={scenario.activityId} disabled={!configured || pending} onClick={() => startScenario(scenario)} className={`rounded-xl border p-3 text-left transition disabled:opacity-50 ${activeScenarioId === scenario.activityId ? "border-violet-600 bg-violet-100" : "border-violet-200 bg-white hover:bg-violet-50"}`}>
            <span className="block text-sm font-black text-violet-950">🎭 {scenario.title}</span>
            <span className="mt-1 block text-xs leading-5 text-slate-600">{scenario.description}</span>
          </button>)}
        </div>
      </div>}

      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-sky-50 p-3">
        <button type="button" onClick={() => setVoiceMode((value) => !value)} className={`min-h-10 rounded-xl px-4 text-sm font-black ${voiceMode ? "bg-sky-700 text-white" : "border border-sky-300 bg-white text-sky-900"}`}>{voiceMode ? "🔊 Hội thoại giọng nói: Bật" : "🔇 Hội thoại giọng nói: Tắt"}</button>
        <p className="text-xs leading-5 text-sky-950">Khi bật, câu nói được gửi ngay và AI tự đọc câu trả lời. Bấm Nói ở mỗi lượt.</p>
      </div>

      {starters.length > 0 && <div className="mt-3 flex flex-wrap gap-2">
        {starters.map((starter) => <button type="button" key={starter} onClick={() => setDraft(starter)} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-900 hover:bg-violet-100">{starter}</button>)}
      </div>}

      <div ref={chatListRef} aria-live="polite" className="mt-4 max-h-80 scroll-smooth space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-3">
        {messages.length === 0 && <div className="rounded-xl bg-white p-3 text-sm leading-6 text-slate-700">
          <strong>AI tutor:</strong> Hi! Choose a real-life situation, speak, or type one short English sentence.
        </div>}
        {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`rounded-xl p-3 text-sm leading-6 ${message.role === "user" ? "ml-6 bg-emerald-100 text-emerald-950" : "mr-6 bg-white text-slate-800"}`}>
          <p className="text-[10px] font-black uppercase tracking-wider">{message.role === "user" ? "Em" : "AI tutor"}</p>
          <p>{message.content}</p>
          {message.role === "assistant" && <button type="button" onClick={() => speakEnglish(message.content)} className="mt-2 text-xs font-black text-sky-800 underline">🔊 Nghe AI đọc</button>}
        </div>)}
        {pending && <p className="rounded-xl bg-violet-50 p-3 text-sm font-bold text-violet-800">AI đang trả lời…</p>}
      </div>

      <form onSubmit={submit} className="mt-3">
        <label htmlFor={`ai-chat-${unitId}`} className="text-sm font-black text-slate-800">Nói hoặc nhập câu tiếng Anh</label>
        <div className="mt-2 flex flex-wrap gap-2 sm:flex-nowrap">
          <input id={`ai-chat-${unitId}`} value={draft} maxLength={240} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-[1_1_220px] rounded-xl border border-slate-300 px-4 py-3" placeholder="Ví dụ: Hello! How are you?" autoComplete="off"/>
          <button type="button" onClick={listen} disabled={listening || pending} className={`min-h-12 rounded-xl px-4 font-black disabled:opacity-50 ${recording ? "bg-rose-600 text-white" : "bg-sky-100 text-sky-900"}`}>{recording ? "⏹ Dừng & gửi" : listening ? "Đang nhận giọng…" : "🎙 Nói"}</button>
          <button type="submit" disabled={!configured || pending || !draft.trim()} className="min-h-12 rounded-xl bg-violet-700 px-4 font-black text-white disabled:opacity-40">Gửi</button>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">{voiceConfigured ? "Đoạn ghi âm ngắn được gửi tới Groq Whisper để chuyển thành chữ rồi xóa; English123 không lưu tệp âm thanh." : "Trình duyệt chuyển lời nói thành chữ; English123 không lưu bản ghi âm."}</p>
        {error && <p className="mt-2 text-sm font-bold text-rose-700">{error}</p>}
      </form>
    </div>}
  </section>;
}

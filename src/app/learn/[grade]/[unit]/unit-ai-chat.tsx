"use client";

import { FormEvent, useState } from "react";
import { speakEnglish, startEnglishRecognition } from "@/lib/browser-speech";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function UnitAiChat({
  unitId,
  unitTitle,
  unitTheme,
  starters,
  configured,
}: {
  unitId: string;
  unitTitle: string;
  unitTheme: string;
  starters: string[];
  configured: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  function listen() {
    setError("");
    setListening(true);
    const supported = startEnglishRecognition(
      (transcript) => {
        setDraft(transcript);
        setListening(false);
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

  async function send(event: FormEvent) {
    event.preventDefault();
    const message = draft.trim();
    if (!message || pending) return;
    setError("");
    setPending(true);
    const history = messages.slice(-8);
    const response = await fetch("/api/ai/unit-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unitId, message, history }),
    });
    const payload = await response.json().catch(() => null) as { reply?: string; message?: string; error?: string } | null;
    setPending(false);
    if (!response.ok || !payload?.reply) {
      setError(payload?.message || (payload?.error === "AI_NOT_CONFIGURED"
        ? "Chưa cấu hình NVIDIA_API_KEY hoặc OPENAI_API_KEY cho phòng hội thoại AI."
        : "AI đang bận. Em hãy thử lại sau."));
      return;
    }
    setMessages([...messages, { role: "user", content: message }, { role: "assistant", content: payload.reply }]);
    setDraft("");
  }

  return <section className="mt-4 overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
    <button type="button" onClick={() => setExpanded((value) => !value)} className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-violet-50 sm:p-5">
      <span>
        <span className="block text-xs font-black uppercase tracking-wider text-violet-700">Luyện giao tiếp theo Unit</span>
        <span className="mt-1 block text-lg font-black text-slate-950">💬 Trò chuyện với AI · {unitTitle}</span>
        <span className="mt-1 block text-sm text-slate-600">AI chỉ trò chuyện trong chủ đề “{unitTheme}” và sửa câu ngắn gọn.</span>
      </span>
      <span className="shrink-0 rounded-xl bg-violet-700 px-4 py-2 text-sm font-black text-white">{expanded ? "Đóng" : "Mở phòng chat"}</span>
    </button>

    {expanded && <div className="border-t border-violet-100 p-4 sm:p-5">
      <div className="rounded-xl bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-950">
        Đây là AI, có thể trả lời chưa hoàn hảo. Chỉ luyện nội dung bài học; không gửi tên thật, trường học, địa chỉ, email hoặc số điện thoại. Hội thoại không được lưu vào hồ sơ.
      </div>

      {!configured && <p className="mt-3 rounded-xl bg-slate-100 p-3 text-sm font-bold text-slate-700">
        Phòng chat đã được cài đặt nhưng chưa hoạt động vì máy chủ chưa có <code>NVIDIA_API_KEY</code> hoặc <code>OPENAI_API_KEY</code>.
      </p>}

      {starters.length > 0 && <div className="mt-3 flex flex-wrap gap-2">
        {starters.map((starter) => <button type="button" key={starter} onClick={() => setDraft(starter)} className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-900 hover:bg-violet-100">{starter}</button>)}
      </div>}

      <div aria-live="polite" className="mt-4 max-h-80 space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-3">
        {messages.length === 0 && <div className="rounded-xl bg-white p-3 text-sm leading-6 text-slate-700">
          <strong>AI tutor:</strong> Hi! Let&apos;s practise this unit. Start with one short English sentence.
        </div>}
        {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`rounded-xl p-3 text-sm leading-6 ${message.role === "user" ? "ml-8 bg-emerald-100 text-emerald-950" : "mr-8 bg-white text-slate-800"}`}>
          <p className="text-[10px] font-black uppercase tracking-wider">{message.role === "user" ? "Em" : "AI tutor"}</p>
          <p>{message.content}</p>
          {message.role === "assistant" && <button type="button" onClick={() => speakEnglish(message.content)} className="mt-2 text-xs font-black text-sky-800 underline">🔊 Nghe AI đọc</button>}
        </div>)}
      </div>

      <form onSubmit={send} className="mt-3">
        <label htmlFor={`ai-chat-${unitId}`} className="text-sm font-black text-slate-800">Câu tiếng Anh của em</label>
        <div className="mt-2 flex gap-2">
          <input id={`ai-chat-${unitId}`} value={draft} maxLength={240} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3" placeholder="Ví dụ: Hello! How are you?" autoComplete="off"/>
          <button type="button" onClick={listen} disabled={listening} className="min-h-12 rounded-xl bg-sky-100 px-4 font-black text-sky-900 disabled:opacity-50">{listening ? "Đang nghe…" : "🎙 Nói"}</button>
          <button type="submit" disabled={!configured || pending || !draft.trim()} className="min-h-12 rounded-xl bg-violet-700 px-4 font-black text-white disabled:opacity-40">{pending ? "AI đang trả lời…" : "Gửi"}</button>
        </div>
        {error && <p className="mt-2 text-sm font-bold text-rose-700">{error}</p>}
      </form>
    </div>}
  </section>;
}

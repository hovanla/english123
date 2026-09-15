"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
type Recognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: (event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void; start: () => void; abort: () => void;
};

export default function UnitAiCall({ unitId, configured, voiceConfigured, scenarios }: {
  unitId: string; configured: boolean; voiceConfigured: boolean;
  scenarios: { activityId: string; title: string; description: string }[];
}) {
  const [phase, setPhase] = useState("idle");
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [scenario, setScenario] = useState("");
  const active = useRef(false);
  const muteRef = useRef(false);
  const generation = useRef(0);
  const history = useRef<Message[]>([]);
  const cleanupInput = useRef<(() => void) | null>(null);
  const request = useRef<AbortController | null>(null);
  const audio = useRef<SpeechSynthesisUtterance | null>(null);
  const bottom = useRef<HTMLDivElement | null>(null);

  function release() {
    active.current = false;
    generation.current += 1;
    cleanupInput.current?.();
    cleanupInput.current = null;
    request.current?.abort();
    window.speechSynthesis?.cancel();
    audio.current = null;
  }
  useEffect(() => release, []);
  useEffect(() => { if (bottom.current) bottom.current.scrollTop = bottom.current.scrollHeight; }, [messages, phase]);

  function fail(message: string) { release(); setPhase("idle"); setError(message); }
  function end() { release(); setPhase("idle"); }

  async function respond(text: string, opening = false) {
    if (!active.current) return;
    const token = generation.current;
    setPhase("thinking");
    const previous = history.current.slice(-8);
    if (!opening) {
      history.current = [...history.current, { role: "user", content: text }];
      setMessages([...history.current]);
    }
    const controller = new AbortController();
    request.current = controller;
    try {
      const response = await fetch("/api/ai/unit-chat", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ unitId, message: text, history: previous, scenarioActivityId: scenario || undefined }),
      });
      const data = await response.json();
      if (!active.current || token !== generation.current) return;
      if (!response.ok || !data.reply) throw new Error(data.message || "AI chưa trả lời được. Hãy gọi lại sau.");
      history.current = [...history.current, { role: "assistant", content: data.reply }];
      setMessages([...history.current]);
      setPhase("speaking");
      const utterance = new SpeechSynthesisUtterance(data.reply);
      utterance.lang = "en-US"; utterance.rate = 0.9;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) => v.lang.toLowerCase() === "en-us") || voices.find((v) => v.lang.toLowerCase().startsWith("en"));
      if (voice) utterance.voice = voice;
      utterance.onend = () => { if (active.current && token === generation.current) void listen(); };
      utterance.onerror = () => { if (active.current && token === generation.current) fail("Không phát được giọng AI. Hãy kiểm tra âm thanh và gọi lại."); };
      audio.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (cause) {
      if (active.current && token === generation.current) fail(cause instanceof Error ? cause.message : "Kết nối bị gián đoạn. Hãy gọi lại.");
    }
  }

  async function listen() {
    if (!active.current) return;
    if (muteRef.current) { setPhase("muted"); return; }
    setPhase("listening");
    const token = generation.current;
    if (!voiceConfigured) {
      const browser = window as typeof window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
      const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition;
      if (!Constructor) { fail("Trình duyệt chưa hỗ trợ cuộc gọi. Hãy thử Chrome hoặc Edge, hoặc dùng nhắn tin."); return; }
      const recognition = new Constructor();
      recognition.lang = "en-US"; recognition.continuous = false; recognition.interimResults = false;
      let received = false;
      cleanupInput.current = () => { recognition.onend = () => {}; recognition.onerror = () => {}; recognition.onresult = () => {}; recognition.abort(); };
      recognition.onresult = (event) => {
        received = true;
        cleanupInput.current?.(); cleanupInput.current = null;
        if (active.current && token === generation.current) void respond(event.results[0][0].transcript.slice(0, 240));
      };
      recognition.onerror = (event) => {
        if (event.error !== "no-speech" && active.current && token === generation.current) fail("Không nhận được giọng nói. Hãy kiểm tra quyền micro và gọi lại.");
      };
      recognition.onend = () => { if (!received && active.current && token === generation.current && !muteRef.current) void listen(); };
      try { recognition.start(); } catch { fail("Không mở được nhận dạng giọng nói. Hãy gọi lại."); }
      return;
    }
    let inputStream: MediaStream | undefined;
    let inputContext: AudioContext | undefined;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      inputStream = stream;
      if (!active.current || token !== generation.current || muteRef.current) { stream.getTracks().forEach((track) => track.stop()); return; }
      const context = new AudioContext();
      inputContext = context;
      await context.resume();
      if (!active.current || token !== generation.current || muteRef.current) { stream.getTracks().forEach((track) => track.stop()); void context.close(); return; }
      const analyser = context.createAnalyser(); analyser.fftSize = 2048;
      context.createMediaStreamSource(stream).connect(analyser);
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];
      const samples = new Float32Array(analyser.fftSize);
      let speechFrames = 0; let heardSpeech = false; let silence = 0; let elapsed = 0; let cancelled = false;
      let timer = 0;
      const close = () => { window.clearInterval(timer); stream.getTracks().forEach((track) => track.stop()); void context.close(); };
      cleanupInput.current = () => { cancelled = true; if (recorder.state !== "inactive") recorder.stop(); close(); };
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onerror = () => { if (active.current) fail("Micro bị gián đoạn. Hãy gọi lại."); };
      recorder.onstop = async () => {
        if (cancelled) return;
        close(); cleanupInput.current = null;
        if (!active.current || token !== generation.current) return;
        if (!heardSpeech) { fail("Chưa nghe thấy em nói. Bấm Gọi AI khi sẵn sàng nhé."); return; }
        setPhase("transcribing");
        const form = new FormData();
        const blob = new Blob(chunks, { type: recorder.mimeType });
        form.append("audio", blob, recorder.mimeType.includes("mp4") ? "call.m4a" : "call.webm");
        const controller = new AbortController(); request.current = controller;
        try {
          const response = await fetch("/api/ai/speech-to-text", { method: "POST", body: form, signal: controller.signal });
          const data = await response.json();
          if (!active.current || token !== generation.current) return;
          if (!response.ok || !data.transcript) { fail("Chưa nhận được lời nói hoặc dịch vụ đang bận. Hãy gọi lại."); return; }
          await respond(String(data.transcript).slice(0, 240));
        } catch { if (active.current && token === generation.current) fail("Kết nối bị gián đoạn. Hãy gọi lại."); }
      };
      recorder.start(250);
      timer = window.setInterval(() => {
        analyser.getFloatTimeDomainData(samples);
        const volume = Math.sqrt(samples.reduce((sum, sample) => sum + sample * sample, 0) / samples.length);
        elapsed += 100;
        if (volume > 0.018) { speechFrames++; if (speechFrames >= 3) heardSpeech = true; silence = 0; }
        else { silence += 100; }
        if ((heardSpeech && silence >= 1400) || elapsed >= 15000) { window.clearInterval(timer); if (recorder.state !== "inactive") recorder.stop(); }
      }, 100);
    } catch {
      inputStream?.getTracks().forEach((track) => track.stop());
      if (inputContext && inputContext.state !== "closed") void inputContext.close();
      if (active.current && token === generation.current) fail("Không mở được micro. Hãy cho phép truy cập micro và gọi lại.");
    }
  }

  function start() {
    if (!("speechSynthesis" in window)) { setError("Thiết bị chưa hỗ trợ giọng đọc. Hãy dùng nhắn tin."); return; }
    release(); active.current = true; muteRef.current = false; setMuted(false); setError("");
    history.current = []; setMessages([]);
    void respond("Start a short English conversation about this unit. Speak first and ask me one simple question. Keep each turn to one or two short sentences.", true);
  }
  function toggleMute() {
    muteRef.current = !muteRef.current; setMuted(muteRef.current);
    if (muteRef.current && phase === "listening") { cleanupInput.current?.(); cleanupInput.current = null; setPhase("muted"); }
    else if (!muteRef.current && phase === "muted") void listen();
  }
  const labels: Record<string, string> = { idle: "Sẵn sàng trò chuyện", listening: "Đang nghe em nói…", transcribing: "Đang nhận lời nói…", thinking: "AI đang suy nghĩ…", speaking: "AI đang nói…", muted: "Micro đang tắt" };
  return <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-white">
    <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full bg-violet-600 text-2xl">☎</span><div><h3 className="font-bold">Cuộc gọi luyện tiếng Anh</h3><p role="status" className="text-sm text-sky-200">{labels[phase]}</p></div></div>
    {phase === "idle" && scenarios.length > 0 && <select aria-label="Tình huống cuộc gọi" value={scenario} onChange={(event) => setScenario(event.target.value)} className="mt-3 w-full rounded-xl bg-slate-800 p-3 text-sm"><option value="">Trò chuyện theo Unit</option>{scenarios.map((item) => <option key={item.activityId} value={item.activityId}>{item.title}</option>)}</select>}
    <p className="mt-3 text-xs leading-5 text-slate-300">Nói một câu ngắn rồi dừng một chút. AI trả lời xong sẽ tự nghe lượt tiếp theo. Giữ trang mở khi gọi.</p>
    <div className="mt-3 flex gap-2">{phase === "idle" ? <button disabled={!configured} onClick={start} className="min-h-11 rounded-xl bg-emerald-600 px-5 font-bold disabled:opacity-40">☎ Gọi AI</button> : <><button onClick={toggleMute} aria-pressed={muted} className="min-h-11 rounded-xl bg-slate-700 px-4">{muted ? "Bật micro" : "Tắt micro"}</button><button onClick={end} className="min-h-11 rounded-xl bg-rose-600 px-4 font-bold">Kết thúc</button></>}</div>
    {error && <p role="alert" className="mt-3 text-sm text-amber-200">{error}</p>}
    <div ref={bottom} aria-live="polite" className="mt-3 max-h-56 space-y-2 overflow-y-auto">{messages.map((message, index) => <p key={index} className={`rounded-xl p-3 text-sm ${message.role === "user" ? "ml-4 bg-emerald-900" : "mr-4 bg-slate-800"}`}><strong>{message.role === "user" ? "Em" : "AI"}: </strong>{message.content}</p>)}</div>
  </div>;
}

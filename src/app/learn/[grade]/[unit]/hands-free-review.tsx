"use client";

import { useEffect, useRef, useState } from "react";
import { buildListeningItems, type ListeningItem, type ListeningMode } from "@/lib/hands-free-content";

type Activity = { id: string; type: string; payload: Record<string, unknown> };
type Phase = "prompt" | "think" | "repeat" | "answer" | "gap";
const labels: Record<Phase, string> = { prompt: "Lắng nghe", think: "Tự trả lời trong đầu", repeat: "Nghe lại", answer: "Đối chiếu đáp án", gap: "Chuẩn bị câu tiếp theo" };

export default function HandsFreeReview({ unitId, activities, weakIds }: { unitId: string; activities: Activity[]; weakIds: string[] }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ListeningMode>("meaning");
  const [delay, setDelay] = useState(5);
  const [weakOnly, setWeakOnly] = useState(false);
  const [queue, setQueue] = useState<ListeningItem[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("prompt");
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [replay, setReplay] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [vietnameseVoiceUri, setVietnameseVoiceUri] = useState("");
  const generation = useRef(0);
  const completed = useRef(new Set<number>());
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const item = queue[index];
  const available = buildListeningItems(activities, mode, weakOnly ? weakIds : undefined);
  const vietnameseVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("vi"));

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const loadVoices = () => {
      const next = window.speechSynthesis.getVoices();
      setVoices(next);
      const vietnamese = next.filter((voice) => voice.lang.toLowerCase().startsWith("vi"));
      setVietnameseVoiceUri((current) => current && vietnamese.some((voice) => voice.voiceURI === current) ? current : vietnamese[0]?.voiceURI || "");
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  function stopAudio() {
    generation.current += 1;
    window.speechSynthesis?.cancel();
    utteranceRef.current = null;
  }

  function finish() {
    stopAudio();
    setPlaying(false);
    setActive(false);
    const count = completed.current.size;
    setMessage(`Đã ôn bằng nghe ${count}/${queue.length} mục. Kết quả này không đánh dấu từ là đã thuộc.`);
    try { localStorage.setItem(`english123-listening-${unitId}`, JSON.stringify({ count, total: queue.length, at: new Date().toISOString() })); } catch { /* Storage may be unavailable. */ }
  }

  function next() {
    stopAudio();
    if (index + 1 >= queue.length) { finish(); return; }
    setIndex(index + 1);
    setPhase("prompt");
  }

  function start() {
    if (!("speechSynthesis" in window)) { setMessage("Thiết bị chưa hỗ trợ đọc văn bản. Hãy thử trình duyệt khác."); return; }
    if (!available.length) return;
    let playable = [...available];
    if (!vietnameseVoices.length) {
      if (mode === "situation") {
        setMessage("Thiết bị chưa có giọng tiếng Việt nên chưa thể đọc tình huống đúng. Hãy chọn cách ôn bằng tiếng Anh hoặc cài giọng Việt trong cài đặt giọng nói của thiết bị.");
        return;
      }
      if (mode === "meaning") {
        playable = playable
          .filter((entry) => entry.englishAnswer)
          .map((entry) => ({ ...entry, answer: entry.englishAnswer!, answerLang: "en-US" }));
        if (!playable.length) {
          setMessage("Thiết bị chưa có giọng tiếng Việt và các mục này chưa có giải thích Anh–Anh để thay thế.");
          return;
        }
        setMessage("Thiết bị chưa có giọng Việt; phần đối chiếu sẽ dùng gợi ý Anh–Anh để tránh đọc tiếng Việt sai.");
      }
    }
    stopAudio();
    const shuffled = [...playable];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    completed.current.clear();
    setQueue(shuffled); setIndex(0); setPhase("prompt"); setActive(true); setPlaying(true);
    try { localStorage.setItem("english123-listening-settings", JSON.stringify({ mode, delay, weakOnly })); } catch { /* Optional preference. */ }
  }

  function showSettings() {
    setOpen(!open);
    if (!open) {
      window.speechSynthesis?.getVoices();
      try {
        const saved = JSON.parse(localStorage.getItem("english123-listening-settings") || "null");
        if (saved && ["meaning", "situation", "response"].includes(saved.mode)) setMode(saved.mode);
        if (saved && [3, 5, 8, 10].includes(saved.delay)) setDelay(saved.delay);
        if (saved) setWeakOnly(saved.weakOnly === true);
      } catch { /* Ignore invalid saved preferences. */ }
    }
  }

  useEffect(() => {
    if (!active || !playing || !item) return;
    const token = ++generation.current;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const valid = () => generation.current === token;
    if (phase === "think" || phase === "gap") {
      let remaining = phase === "think" ? delay : 2;
      timer = setTimeout(function tick() {
        if (!valid()) return;
        setSeconds(remaining);
        if (remaining-- > 0) { timer = setTimeout(tick, 1000); return; }
        if (phase === "think") setPhase(mode === "meaning" ? "repeat" : "answer");
        else if (index + 1 < queue.length) { setIndex(index + 1); setPhase("prompt"); }
        else {
          setPlaying(false); setActive(false);
          const count = completed.current.size;
          setMessage(`Đã ôn bằng nghe ${count}/${queue.length} mục. Chưa tự đánh dấu đã thuộc.`);
          try { localStorage.setItem(`english123-listening-${unitId}`, JSON.stringify({ count, total: queue.length, at: new Date().toISOString() })); } catch { /* Optional local summary. */ }
        }
      }, 0);
    } else {
      const utterance = new SpeechSynthesisUtterance(phase === "answer" ? item.answer : item.prompt);
      utterance.lang = phase === "answer" ? item.answerLang : item.promptLang;
      utterance.rate = 0.82;
      const voices = window.speechSynthesis.getVoices();
      const language = utterance.lang.toLowerCase();
      const selectedVietnameseVoice = language.startsWith("vi") ? voices.find((voice) => voice.voiceURI === vietnameseVoiceUri) : undefined;
      const voice = selectedVietnameseVoice
        || voices.find((v) => v.lang.toLowerCase() === language)
        || voices.find((v) => v.lang.toLowerCase().startsWith(language.slice(0, 2)));
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        if (!valid()) return;
        if (phase === "answer") completed.current.add(index);
        setSeconds(phase === "prompt" ? delay : 2);
        setPhase(phase === "prompt" ? "think" : phase === "repeat" ? "answer" : "gap");
      };
      utterance.onerror = () => {
        if (!valid()) return;
        setPlaying(false); setMessage("Giọng đọc bị ngắt. Bấm Tiếp tục để nghe lại đoạn này.");
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    }
    return () => {
      generation.current += 1;
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [active, playing, item, phase, index, queue.length, delay, mode, unitId, replay, vietnameseVoiceUri]);

  return <section className="mt-3 rounded-2xl border border-sky-200 bg-white p-3">
    <button type="button" onClick={showSettings} className="min-h-11 rounded-xl bg-sky-800 px-4 text-sm font-bold text-white">🎧 Ôn rảnh tay {open ? "▴" : "▾"}</button>
    {open && !active && <div className="mt-3 space-y-3 text-sm">
      <div className="grid gap-3 sm:grid-cols-3">
        <label>Cách ôn<select value={mode} onChange={(e) => setMode(e.target.value as ListeningMode)} className="mt-1 block w-full rounded-lg border p-2">
          <option value="meaning">Nghe tiếng Anh → nhớ nghĩa</option><option value="situation">Nghe tình huống → nghĩ câu</option><option value="response">Nghe người đối diện → trả lời</option>
        </select></label>
        <label>Thời gian suy nghĩ<select value={delay} onChange={(e) => setDelay(Number(e.target.value))} className="mt-1 block w-full rounded-lg border p-2">{[3, 5, 8, 10].map((n) => <option key={n} value={n}>{n} giây</option>)}</select></label>
        <label>Nội dung<select value={weakOnly ? "weak" : "all"} onChange={(e) => setWeakOnly(e.target.value === "weak")} className="mt-1 block w-full rounded-lg border p-2"><option value="all">Cả Unit</option><option value="weak">Mục chưa nhớ</option></select></label>
      </div>
      {vietnameseVoices.length > 0 && <label className="block max-w-sm">Giọng đọc tiếng Việt<select value={vietnameseVoiceUri} onChange={(event) => setVietnameseVoiceUri(event.target.value)} className="mt-1 block w-full rounded-lg border p-2">{vietnameseVoices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} · {voice.lang}</option>)}</select></label>}
      {vietnameseVoices.length === 0 && <p className="rounded-lg bg-amber-50 p-2 text-xs text-amber-900">Chưa tìm thấy giọng Việt trên thiết bị. Chế độ nhớ nghĩa sẽ dùng gợi ý Anh–Anh; chế độ đọc tình huống cần cài thêm giọng Việt.</p>}
      <p className="text-xs text-slate-600">{available.length} mục · Xáo thứ tự · Giữ trang mở và màn hình sáng khi nghe.</p>
      {!available.length && <p>Chưa có nội dung phù hợp với lựa chọn này. Hãy đổi cách ôn hoặc chọn cả Unit.</p>}
      <button type="button" disabled={!available.length} onClick={start} className="min-h-11 rounded-xl bg-emerald-700 px-5 font-bold text-white disabled:opacity-40">Bắt đầu nghe</button>
    </div>}
    {message && <p role="status" className="mt-2 text-sm text-sky-900">{message}</p>}
    {active && item && <>
      <div className="h-40" aria-hidden="true"/>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-sky-200 bg-white p-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-lg">
        <div className="mx-auto max-w-3xl">
          <p role="status" className="text-xs font-bold text-sky-800">Mục {index + 1}/{queue.length} · {playing ? labels[phase] : "Đã tạm dừng"}{playing && (phase === "think" || phase === "gap") ? ` · ${seconds}s` : ""}</p>
          <p className="mt-1 text-sm">{item.prompt}</p>
          {(phase === "answer" || phase === "gap") && <p className="mt-1 font-bold text-emerald-800">{mode === "response" ? "Một câu trả lời mẫu: " : ""}{item.answer}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" onClick={() => { stopAudio(); setPhase("prompt"); setReplay((value) => value + 1); setPlaying(true); }} className="min-h-11 rounded-lg bg-sky-100 px-3">↺ Nghe lại</button>
            <button type="button" onClick={() => { stopAudio(); setPlaying(!playing); }} className="min-h-11 rounded-lg bg-sky-800 px-4 font-bold text-white">{playing ? "⏸ Tạm dừng" : "▶ Tiếp tục"}</button>
            <button type="button" onClick={next} className="min-h-11 rounded-lg bg-sky-100 px-3">⏭ Tiếp</button>
            <button type="button" onClick={finish} className="min-h-11 rounded-lg border px-3">Kết thúc</button>
          </div>
        </div>
      </div>
    </>}
  </section>;
}

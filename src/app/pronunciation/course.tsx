"use client";
import { useEffect, useRef, useState } from "react";
import { pronunciationLessons } from "@/lib/pronunciation-course";
import { speakEnglish } from "@/lib/browser-speech";
import { assessPronunciation, normalizeSpeechText } from "@/lib/pronunciation";

type Recognition = { lang: string; interimResults: boolean; onresult: (e: { results: ArrayLike<{ 0: { transcript: string } }> }) => void; onerror: () => void; onend: () => void; start: () => void; abort: () => void };

export default function PronunciationCourse() {
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState("");
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const [quiz, setQuiz] = useState<number | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const recognition = useRef<Recognition | null>(null);
  const lesson = pronunciationLessons[index];
  useEffect(() => () => { recognition.current?.abort(); window.speechSynthesis?.cancel(); }, []);
  function select(next: number) {
    recognition.current?.abort(); recognition.current = null;
    window.speechSynthesis?.cancel(); setListening(false); setIndex(next); setTarget(""); setTranscript(""); setError(""); setQuiz(null); setChoice(null);
  }
  function hear(text: string) {
    if (!speakEnglish(text)) setError("Trình duyệt chưa có chức năng đọc mẫu.");
  }
  function record(text: string) {
    recognition.current?.abort(); window.speechSynthesis?.cancel(); setError(""); setTranscript(""); setTarget(text);
    const browser = window as Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Constructor) { setError("Trình duyệt chưa hỗ trợ nhận dạng. Em vẫn có thể nghe mẫu và tự đọc theo; thử Chrome để dùng micro."); return; }
    const current = new Constructor(); recognition.current = current;
    current.lang = "en-US"; current.interimResults = false;
    current.onresult = (event) => { if (recognition.current === current) setTranscript(event.results[0][0].transcript); };
    current.onerror = () => { if (recognition.current === current) { setError("Chưa nhận được lời nói. Kiểm tra quyền micro rồi thử lại."); setListening(false); } };
    current.onend = () => { if (recognition.current === current) setListening(false); };
    try { setListening(true); current.start(); } catch { setListening(false); setError("Không mở được micro. Hãy thử lại."); }
  }
  const feedback = transcript ? assessPronunciation(target, transcript) : null;
  return <div className="mt-4 grid gap-4 md:grid-cols-[210px_1fr]">
    <nav aria-label="Bài phát âm" className="flex gap-2 overflow-x-auto md:block md:space-y-2">{pronunciationLessons.map((entry, i) => <button type="button" key={entry.id} onClick={() => select(i)} className={`min-h-11 shrink-0 rounded-xl px-3 py-2 text-left text-sm md:w-full ${index === i ? "bg-emerald-800 text-white" : "bg-white"}`}>{i + 1}. {entry.title} {done.includes(entry.id) ? "✓" : ""}</button>)}</nav>
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold">{lesson.title}</h2>
      <p className="mt-3 rounded-xl bg-sky-50 p-3 text-sm leading-6">{lesson.tip}</p>
      <p className="mt-2 text-sm text-amber-900">Chú ý: {lesson.mistake}</p>
      <h3 className="mt-4 font-bold">1. Nghe và tập đọc từng từ</h3>
      <p className="mt-1 text-xs text-slate-500">Nghe mẫu, soi gương kiểm tra hướng dẫn rồi đọc lại 3 lần.</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">{lesson.words.map((word) => <div key={word} className="rounded-xl border p-3"><p className="font-bold">{word}</p><div className="mt-2 flex gap-2"><button type="button" disabled={listening} onClick={() => hear(word)} className="min-h-11 rounded-lg bg-sky-100 px-3 disabled:opacity-40">🔊 Mẫu</button><button type="button" disabled={listening} onClick={() => record(word)} className="min-h-11 rounded-lg bg-emerald-100 px-3 disabled:opacity-40">🎙 Đọc</button></div></div>)}</div>
      {lesson.pair.length === 2 && <div className="mt-4 rounded-xl bg-violet-50 p-3"><h3 className="font-bold">2. Phân biệt bằng tai</h3><button type="button" disabled={listening} onClick={() => { const n = Math.floor(Math.random() * 2); setQuiz(n); setChoice(null); hear(lesson.pair[n]); }} className="mt-2 min-h-11 rounded-lg bg-violet-700 px-3 text-white">Nghe câu đố mới</button>{quiz !== null && <><button type="button" disabled={listening} onClick={() => hear(lesson.pair[quiz])} className="ml-2 min-h-11 px-3">Nghe lại</button><div className="mt-2 flex gap-2">{lesson.pair.map((word, n) => <button type="button" key={word} disabled={choice !== null} onClick={() => setChoice(n)} className="min-h-11 rounded-lg border bg-white px-4">{word}</button>)}</div>{choice !== null && <p role="status" className="mt-2 text-sm">{choice === quiz ? "Đúng rồi!" : `Từ vừa nghe là ${lesson.pair[quiz]}. Hãy nghe lại và đối chiếu khẩu hình.`}</p>}</>}</div>}
      <h3 className="mt-4 font-bold">{lesson.pair.length ? "3" : "2"}. Áp dụng vào câu</h3><p className="mt-2 text-lg">{lesson.sentence}</p>
      <div className="mt-2 flex gap-2"><button type="button" disabled={listening} onClick={() => hear(lesson.sentence)} className="min-h-11 rounded-lg bg-sky-100 px-3">🔊 Nghe câu</button><button type="button" disabled={listening} onClick={() => record(lesson.sentence)} className="min-h-11 rounded-lg bg-emerald-100 px-3">🎙 Đọc câu</button></div>
      {listening && <button type="button" onClick={() => { recognition.current?.abort(); setListening(false); }} className="mt-3 min-h-11 rounded-lg bg-rose-100 px-3">Đang nghe… Dừng micro</button>}
      {error && <p role="alert" className="mt-3 text-sm text-rose-700">{error}</p>}
      {feedback && <div role="status" className="mt-3 rounded-xl bg-slate-50 p-3 text-sm"><p>Câu cần đọc: {target}</p><p>Máy nghe được: <strong>{transcript}</strong></p><p className="mt-1">{normalizeSpeechText(target) === normalizeSpeechText(transcript) ? "Lời nhận dạng khớp mẫu. Tiếp tục đối chiếu âm với giọng đọc." : "Lời nhận dạng chưa khớp. Nghe lại và luyện từng cụm ngắn."}</p>{feedback.needsPractice.length > 0 && <p>Từ cần nghe lại: {feedback.needsPractice.join(", ")}</p>}</div>}
      <p className="mt-3 text-xs leading-5 text-slate-500">Micro kiểm tra lời nhận dạng, chưa đo chính xác từng âm hay khẩu hình. Giọng mẫu phụ thuộc thiết bị. English123 không lưu bản ghi âm của phần này.</p>
      <button type="button" onClick={() => { setDone((current) => [...new Set([...current, lesson.id])]); if (index < pronunciationLessons.length - 1) select(index + 1); }} className="mt-4 min-h-11 rounded-xl bg-emerald-800 px-4 font-bold text-white">Đã luyện bài này {index < pronunciationLessons.length - 1 ? "→ Bài tiếp" : "✓"}</button>
      <p className="mt-2 text-xs text-slate-500">Đã luyện {done.length}/12 bài trong phiên này.</p>
    </section>
  </div>;
}

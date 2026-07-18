"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Activity = { id: string; type: string; title: string; instruction: string; payload: Record<string, unknown>; order: number };
type Lesson = { id: string; title: string; description: string; estimatedMinutes: number; activities: Activity[] };
type SpeechWindow = Window & { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition };
type SpeechRecognition = { lang: string; interimResults: boolean; onresult: (event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void; onerror: () => void; start: () => void };

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.78;
  window.speechSynthesis.speak(utterance);
}

export default function LessonPlayer({ lessons }: { lessons: Lesson[] }) {
  const activities = useMemo(() => lessons.flatMap((lesson, lessonIndex) => lesson.activities.map((activity) => ({ ...activity, lessonTitle: lesson.title, lessonIndex }))), [lessons]);
  const lessonStarts = useMemo(() => lessons.map((_, lessonIndex) => activities.findIndex((activity) => activity.lessonIndex === lessonIndex)), [activities, lessons]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Record<string, unknown>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [pending, setPending] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const activity = activities[index];

  if (!activity) return <p className="mt-6 rounded-2xl bg-white p-5">Unit này chưa có hoạt động.</p>;

  const payload = activity.payload;
  const options = (payload.options || []) as Array<{ id: string; text: string }>;
  const pairs = (payload.pairs || []) as Array<{ left: string; right: string }>;
  const imageUrl = typeof payload.imageUrl === "string" ? payload.imageUrl : "";
  const isVisualGuess = activity.type === "FLASHCARD" && payload.mode === "VISUAL_GUESS";
  const progress = ((index + (result?.passed ? 1 : 0)) / activities.length) * 100;

  function resetActivity(nextIndex: number) {
    setIndex(nextIndex);
    setAnswer({});
    setResult(null);
    setRevealed(false);
  }

  async function submit() {
    setPending(true);
    const response = await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId: activity.id, answer, durationSeconds: 0 }),
    });
    const data = await response.json();
    setPending(false);
    if (response.ok) setResult({ score: data.score, passed: data.passed });
  }

  function startSpeech() {
    const speechWindow = window as SpeechWindow;
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setAnswer({ unsupported: true, confirmed: true });
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => setAnswer({ transcript: event.results[0][0].transcript });
    recognition.onerror = () => setAnswer({ unsupported: true, confirmed: true });
    recognition.start();
  }

  return <section className="mt-7 grid gap-5 lg:grid-cols-[260px_1fr]">
    <aside className="h-fit rounded-3xl bg-white p-4 shadow-sm lg:sticky lg:top-4">
      <p className="px-2 text-xs font-black uppercase tracking-wider text-emerald-700">Tiến độ unit</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }}/></div>
      <p className="mt-2 px-2 text-xs font-bold text-slate-500">{index + 1}/{activities.length} phản xạ</p>
      <div className="mt-5 space-y-2">{lessons.map((lesson, lessonIndex) => {
        const active = activity.lessonIndex === lessonIndex;
        return <button type="button" key={lesson.id} onClick={() => resetActivity(lessonStarts[lessonIndex])} className={`w-full rounded-2xl p-3 text-left transition ${active ? "bg-emerald-800 text-white" : "bg-slate-50 hover:bg-emerald-50"}`}>
          <p className="text-sm font-black">{lessonIndex + 1}. {lesson.title}</p>
          <p className={`mt-1 text-xs ${active ? "text-emerald-100" : "text-slate-500"}`}>{lesson.activities.length} hoạt động · {lesson.estimatedMinutes} phút</p>
        </button>;
      })}</div>
    </aside>

    <article className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-wider text-emerald-700">{activity.lessonTitle} · {index + 1}/{activities.length}</p>
        <h2 className="mt-3 text-3xl font-black">{activity.title}</h2>
        <p className="mt-2 leading-7 text-slate-600">{activity.instruction}</p>
      </div>

      <div className="p-6 sm:p-8">
        {imageUrl && <div className="grid gap-5 md:grid-cols-[280px_1fr] md:items-center">
          <div className="relative mx-auto aspect-[5/6] w-full max-w-[320px] overflow-hidden rounded-3xl bg-amber-50"><Image src={imageUrl} alt={String(payload.imageAlt || "Hình minh họa tình huống")} fill sizes="(max-width: 768px) 90vw, 280px" className="object-cover" priority={index === 0}/></div>
          <div>
            {Boolean(payload.scenario) && <p className="rounded-3xl bg-amber-50 p-5 text-lg font-bold leading-8 text-amber-950"><span className="mb-2 block text-xs font-black uppercase tracking-wider text-amber-700">Tình huống đời thật</span>{String(payload.scenario)}</p>}
            {!payload.scenario && <p className="rounded-3xl bg-sky-50 p-5 text-lg font-bold leading-8 text-sky-950"><span className="mb-2 block text-xs font-black uppercase tracking-wider text-sky-700">Nhìn tranh và suy nghĩ</span>{String(payload.prompt)}</p>}
          </div>
        </div>}

        {!imageUrl && Boolean(payload.scenario) && <p className="rounded-3xl bg-amber-50 p-5 text-lg font-bold leading-8 text-amber-950"><span className="mb-2 block text-xs font-black uppercase tracking-wider text-amber-700">Tình huống đời thật</span>{String(payload.scenario)}</p>}
        {!imageUrl && Boolean(payload.visual) && <div className="mt-2 text-center text-7xl" aria-hidden="true">{String(payload.visual)}</div>}
        {!payload.scenario && !imageUrl && <p className="mt-5 text-center text-xl font-black leading-8">{String(payload.prompt)}</p>}

        {(activity.type === "LISTEN_CHOOSE" || activity.type === "LISTEN_TYPE") && <div className="mt-6 text-center"><button type="button" onClick={() => speak(String(payload.text || ""))} className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-sky-100 px-6 py-3 font-black text-sky-900 hover:bg-sky-200"><span className="text-2xl">🔊</span> Nghe lại</button><p className="mt-2 text-xs font-bold text-slate-500">Từ tiếng Anh được giấu để em luyện nghe thật</p></div>}

        {activity.type === "FLASHCARD" && <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
          {isVisualGuess && !revealed ? <>
            <div className="text-6xl" aria-hidden="true">{String(payload.visual || "✨")}</div>
            <p className="mt-4 font-bold text-amber-950">Nói đáp án trong đầu trước nhé.</p>
            <button type="button" onClick={() => setRevealed(true)} className="mt-5 rounded-2xl bg-amber-500 px-6 py-3 font-black text-amber-950 hover:bg-amber-400">Xem đáp án</button>
          </> : <>
            {payload.visual && <div className="text-5xl" aria-hidden="true">{String(payload.visual)}</div>}
            <p className="mt-3 text-4xl font-black text-slate-950">{String(payload.front)}</p>
            <p className="mt-2 text-xl font-bold text-amber-900">{String(payload.back)}</p>
            {payload.example && <p className="mt-3 text-sm text-slate-600">{String(payload.example)}</p>}
            <div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => speak(String(payload.front || ""))} className="rounded-2xl bg-sky-100 px-5 py-3 font-black text-sky-900">🔊 Nghe từ</button><button type="button" onClick={() => setAnswer({ known: true })} className="rounded-2xl bg-emerald-700 px-5 py-3 font-black text-white">Em đã nói lại</button></div>
          </>}
        </div>}

        {(activity.type === "MULTIPLE_CHOICE" || activity.type === "LISTEN_CHOOSE") && <div className="mt-6 grid gap-3">{options.map((option, optionIndex) => <button type="button" onClick={() => setAnswer({ optionId: option.id })} key={option.id} className={`min-h-14 rounded-2xl border p-4 text-left font-bold transition ${answer.optionId === option.id ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100" : "border-slate-200 hover:border-emerald-300"}`}><span className="mr-3 inline-grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-xs">{String.fromCharCode(65 + optionIndex)}</span>{option.text}</button>)}</div>}

        {activity.type === "MATCHING" && <div className="mt-5 space-y-3">{pairs.map((pair) => <label key={pair.left} className="grid items-center gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-2"><strong>{pair.left}</strong><select className="rounded-xl border bg-white p-2" onChange={(event) => { const current = (answer.pairs || []) as Array<{ left: string; right: string }>; setAnswer({ pairs: [...current.filter((item) => item.left !== pair.left), { left: pair.left, right: event.target.value }] }); }}><option value="">Chọn nghĩa</option>{pairs.map((item) => <option key={item.right}>{item.right}</option>)}</select></label>)}</div>}

        {(activity.type === "LISTEN_TYPE" || activity.type === "SENTENCE") && <input
          className="mt-5 w-full rounded-2xl border border-slate-300 px-4 py-3"
          placeholder="Nhập câu tiếng Anh"
          value={String(answer.text || "")}
          onChange={(event) => setAnswer({ text: event.target.value })}
        />}

        {activity.type === "SPEAK_REPEAT" && <div className="mt-6 rounded-3xl bg-purple-50 p-6 text-center">
          <p className="text-sm font-black uppercase tracking-wider text-purple-700">Nghe → nhìn tình huống → nói ngay</p>
          <p className="mt-3 text-3xl font-black">{String(payload.target)}</p>
          {Boolean(payload.translation) && <p className="mt-2 text-slate-600">{String(payload.translation)}</p>}
          <div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => speak(String(payload.target || ""))} className="rounded-2xl bg-sky-100 px-5 py-3 font-black text-sky-900">🔊 Nghe mẫu</button><button type="button" onClick={startSpeech} className="rounded-2xl bg-purple-700 px-5 py-3 font-black text-white">🎙 Nói ngay</button></div>
          <p className="mt-3 text-sm text-slate-600">{answer.transcript ? `Em đã nói: ${answer.transcript}` : answer.unsupported ? "Thiết bị không nhận dạng giọng nói. Em vẫn có thể nghe và nói theo; bài học không bị khóa." : "Giọng nói chỉ được nhận dạng trên thiết bị và không được lưu."}</p>
        </div>}

        {activity.type === "SHORT_WRITING" && <textarea
          className="mt-5 min-h-36 w-full rounded-2xl border border-slate-300 px-4 py-3"
          placeholder={String(payload.prompt || "Viết câu trả lời của em")}
          value={String(answer.text || "")}
          onChange={(event) => setAnswer({ text: event.target.value })}
        />}

        {result ? <div aria-live="polite" className={`mt-6 rounded-3xl p-5 ${result.passed ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-950"}`}>
          <p className="text-xl font-black">{result.passed ? `Chính xác! ${result.score} điểm` : `Chưa đúng rồi. Mình xem đáp án và thử lại nhé.`}</p>
          {Boolean(payload.explanation) && <p className="mt-3 font-bold">Đáp án: {String(payload.explanation)}</p>}
          {Boolean(payload.modelAnswer) && <p className="mt-2 text-sm leading-6">{String(payload.modelAnswer)}</p>}
          {result.passed && index < activities.length - 1 && <button type="button" onClick={() => resetActivity(index + 1)} className="mt-4 rounded-2xl bg-emerald-700 px-5 py-3 font-black text-white">Phản xạ tiếp theo →</button>}
          {result.passed && index === activities.length - 1 && <a href="/dashboard" className="mt-4 inline-block rounded-2xl bg-emerald-700 px-5 py-3 font-black text-white">Hoàn thành unit</a>}
          {!result.passed && <button type="button" onClick={() => { setResult(null); setAnswer({}); }} className="mt-4 rounded-2xl bg-amber-500 px-5 py-3 font-black">Thử lại</button>}
        </div> : <button type="button" disabled={pending || Object.keys(answer).length === 0} onClick={submit} className="mt-6 min-h-13 rounded-2xl bg-emerald-700 px-7 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-40">{pending ? "Đang kiểm tra…" : "Kiểm tra phản xạ"}</button>}
      </div>
    </article>
  </section>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { speakEnglish, startEnglishRecognition } from "@/lib/browser-speech";
import { assessPronunciation } from "@/lib/pronunciation";

type Activity = { id: string; type: string; title: string; instruction: string; payload: Record<string, unknown>; order: number };
type Lesson = { id: string; title: string; description: string; estimatedMinutes: number; activities: Activity[] };

function LessonImage({ src, alt, spriteIndex, spriteColumns = 3, spriteRows = 2, priority }: { src: string; alt: string; spriteIndex?: number; spriteColumns?: number; spriteRows?: number; priority: boolean }) {
  if (spriteIndex === undefined) {
    return <div className="relative mx-auto aspect-[5/6] w-full max-w-[240px] overflow-hidden rounded-2xl bg-amber-50">
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 80vw, 220px" className="object-cover" priority={priority}/>
    </div>;
  }

  const column = spriteIndex % spriteColumns;
  const row = Math.floor(spriteIndex / spriteColumns);
  return <div className="relative mx-auto aspect-square w-full max-w-[190px] overflow-hidden rounded-2xl bg-sky-50 ring-1 ring-sky-100 sm:max-w-[260px]">
    <div className="absolute" style={{ width: `${spriteColumns * 100}%`, height: `${spriteRows * 100}%`, left: `-${column * 100}%`, top: `-${row * 100}%` }}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 780px" className="object-fill" priority={priority}/>
    </div>
  </div>;
}

export default function LessonPlayer({ lessons, completionHref, completionLabel }: { lessons: Lesson[]; completionHref: string; completionLabel: string }) {
  const activities = useMemo(() => lessons.flatMap((lesson, lessonIndex) => lesson.activities.map((activity) => ({ ...activity, lessonTitle: lesson.title, lessonIndex }))), [lessons]);
  const lessonStarts = useMemo(() => lessons.map((_, lessonIndex) => activities.findIndex((activity) => activity.lessonIndex === lessonIndex)), [activities, lessons]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Record<string, unknown>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [pending, setPending] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [imageHintVisible, setImageHintVisible] = useState(false);
  const [recallSeconds, setRecallSeconds] = useState(5);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<ReturnType<typeof assessPronunciation> | null>(null);
  const [speechError, setSpeechError] = useState("");
  const activity = activities[index];
  const isResponseRecall = activity?.type === "SENTENCE" && activity.payload.mode === "RESPONSE_RECALL";

  useEffect(() => {
    if (!isResponseRecall) return;
    const timer = window.setInterval(() => {
      setRecallSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activity?.id, isResponseRecall]);

  if (!activity) return <p className="mt-6 rounded-2xl bg-white p-5">Unit này chưa có hoạt động.</p>;

  const payload = activity.payload;
  const options = (payload.options || []) as Array<{ id: string; text: string }>;
  const pairs = (payload.pairs || []) as Array<{ left: string; right: string }>;
  const imageUrl = typeof payload.imageUrl === "string" ? payload.imageUrl : "";
  const spriteIndex = typeof payload.spriteIndex === "number" ? payload.spriteIndex : undefined;
  const spriteColumns = typeof payload.spriteColumns === "number" ? payload.spriteColumns : 3;
  const spriteRows = typeof payload.spriteRows === "number" ? payload.spriteRows : 2;
  const isVisualGuess = activity.type === "FLASHCARD" && payload.mode === "VISUAL_GUESS";
  const isAudioGuess = activity.type === "FLASHCARD" && payload.mode === "AUDIO_GUESS";
  const isHiddenGuess = isVisualGuess || isAudioGuess;
  const canShowImageHint = isVisualGuess || isResponseRecall;
  const imageHint = String(payload.imageHint || payload.imageAlt || "Quan sát nhân vật, đồ vật và hành động chính trong ảnh.");
  const progress = ((index + (result?.passed ? 1 : 0)) / activities.length) * 100;

  function resetActivity(nextIndex: number) {
    setIndex(nextIndex);
    setAnswer({});
    setResult(null);
    setRevealed(false);
    setHintVisible(false);
    setImageHintVisible(false);
    setRecallSeconds(5);
    setPronunciationFeedback(null);
    setSpeechError("");
  }

  async function submit(submittedAnswer = answer) {
    setPending(true);
    const response = await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId: activity.id, answer: submittedAnswer, durationSeconds: 0 }),
    });
    const data = await response.json();
    setPending(false);
    if (response.ok) setResult({ score: data.score, passed: data.passed });
  }

  async function rateFlashcardAndAdvance(known: boolean) {
    setPending(true);
    const response = await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId: activity.id, answer: { known }, durationSeconds: 0 }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) return;
    if (index < activities.length - 1) resetActivity(index + 1);
    else setResult({ score: data.score, passed: data.passed });
  }

  function startSpeech(target: string, answerKey: "text" | "transcript" = "transcript") {
    setSpeechError("");
    const supported = startEnglishRecognition(
      (transcript) => {
        setAnswer({ [answerKey]: transcript });
        setPronunciationFeedback(assessPronunciation(target, transcript));
      },
      () => setSpeechError("Chưa nghe rõ. Em hãy thử lại ở nơi yên tĩnh và nói chậm hơn."),
    );
    if (!supported) {
      if (answerKey === "transcript") setAnswer({ unsupported: true, confirmed: true });
      setSpeechError("Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Em vẫn có thể nghe mẫu và nhập câu.");
    }
  }

  return <section className="mt-4 grid gap-4 lg:grid-cols-[220px_1fr]">
    <aside className="order-2 h-fit rounded-2xl bg-white p-3 shadow-sm lg:order-none lg:sticky lg:top-3">
      <p className="px-2 text-xs font-black uppercase tracking-wider text-emerald-700">Tiến độ unit</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }}/></div>
      <p className="mt-1.5 px-2 text-xs font-bold text-slate-500">Bước {index + 1}/{activities.length}</p>
      <div className="mt-3 space-y-1.5">{lessons.map((lesson, lessonIndex) => {
        const active = activity.lessonIndex === lessonIndex;
        return <button type="button" key={lesson.id} onClick={() => resetActivity(lessonStarts[lessonIndex])} className={`w-full rounded-xl p-2.5 text-left transition ${active ? "bg-emerald-800 text-white" : "bg-slate-50 hover:bg-emerald-50"}`}>
          <p className="text-[13px] font-black">{lessonIndex + 1}. {lesson.title}</p>
          <p className={`mt-1 text-xs ${active ? "text-emerald-100" : "text-slate-500"}`}>{lesson.activities.length} hoạt động · {lesson.estimatedMinutes} phút</p>
        </button>;
      })}</div>
    </aside>

    <article className="order-1 overflow-hidden rounded-2xl bg-white shadow-sm lg:order-none">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-xs font-black uppercase tracking-wider text-emerald-700">{activity.lessonTitle} · {index + 1}/{activities.length}</p>
        <h2 className="mt-2 text-xl font-black sm:text-2xl">{activity.title}</h2>
        <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{activity.instruction}</p>
      </div>

      <div className="p-4 sm:p-5">
        {imageUrl && <div className="grid gap-3 md:grid-cols-[220px_1fr] md:items-center">
          <LessonImage src={imageUrl} alt={String(payload.imageAlt || "Hình minh họa tình huống")} spriteIndex={spriteIndex} spriteColumns={spriteColumns} spriteRows={spriteRows} priority={index === 0}/>
          <div>
            {Boolean(payload.scenario) && !isResponseRecall && <p className="rounded-2xl bg-amber-50 p-4 text-base font-bold leading-6 text-amber-950"><span className="mb-1.5 block text-[11px] font-black uppercase tracking-wider text-amber-700">Tình huống đời thật</span>{String(payload.scenario)}</p>}
            {(!payload.scenario || isResponseRecall) && <p className="rounded-2xl bg-sky-50 p-3 text-sm font-bold leading-5 text-sky-950 sm:p-4 sm:text-base sm:leading-6"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-sky-700 sm:text-[11px]">Nhìn tranh và suy nghĩ</span>{isResponseRecall ? "Quan sát tình huống và tự tạo câu tiếng Anh phù hợp." : String(payload.prompt)}</p>}
            {canShowImageHint && <div className="mt-3">
              {!imageHintVisible ? <button type="button" onClick={() => setImageHintVisible(true)} className="min-h-10 rounded-xl border border-sky-300 bg-white px-4 py-2 text-sm font-black text-sky-800 hover:bg-sky-50">Không hiểu ảnh? Xem mô tả</button> : <div aria-live="polite" className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm leading-6 text-sky-950">
                <span className="block text-[10px] font-black uppercase tracking-wider text-sky-700">Gợi ý mô tả ảnh</span>
                <p className="mt-1 font-bold">{imageHint}</p>
                <button type="button" onClick={() => setImageHintVisible(false)} className="mt-2 text-xs font-black text-sky-800 underline">Ẩn gợi ý</button>
              </div>}
            </div>}
            {isHiddenGuess && <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-center">
              {!revealed ? <>
                <div className="flex flex-wrap justify-center gap-2"><button type="button" onClick={() => speakEnglish(String(payload.audioText || payload.front || ""))} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-100 px-4 py-2 font-black text-sky-900 hover:bg-sky-200"><span className="text-lg">🔊</span> {isAudioGuess ? "Nghe câu" : "Nghe từ"}</button><button type="button" onClick={() => setRevealed(true)} className="min-h-11 rounded-xl bg-amber-500 px-5 py-2 font-black text-amber-950 hover:bg-amber-400">Xem đáp án</button></div>
                <p className="mt-2 text-xs font-bold text-amber-950">Đoán trong đầu trước khi mở đáp án nhé.</p>
              </> : <>
                <p className="text-2xl font-black text-slate-950">{String(payload.front)}</p>
                <p className="mt-1 text-base font-bold text-amber-900">{String(payload.back)}</p>
                {Boolean(payload.example) && <p className="mt-1 text-xs text-slate-600">{String(payload.example)}</p>}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <button type="button" onClick={() => speakEnglish(String(payload.audioText || payload.front || ""))} className="min-h-11 rounded-xl bg-sky-100 px-4 py-2 font-black text-sky-900">🔊 Nghe lại</button>
                  <button type="button" disabled={pending} onClick={() => void rateFlashcardAndAdvance(false)} className="min-h-11 rounded-xl border border-amber-400 bg-white px-4 py-2 font-black text-amber-900 disabled:opacity-50">Chưa nhớ</button>
                  <button type="button" disabled={pending} onClick={() => void rateFlashcardAndAdvance(true)} className="min-h-11 rounded-xl bg-emerald-700 px-4 py-2 font-black text-white disabled:opacity-50">Nhớ rồi →</button>
                </div>
              </>}
            </div>}
          </div>
        </div>}

        {!imageUrl && !isResponseRecall && Boolean(payload.scenario) && <p className="rounded-2xl bg-amber-50 p-4 text-base font-bold leading-6 text-amber-950"><span className="mb-1.5 block text-[11px] font-black uppercase tracking-wider text-amber-700">Tình huống đời thật</span>{String(payload.scenario)}</p>}
        {!imageUrl && activity.type !== "FLASHCARD" && Boolean(payload.visual) && <div className="mt-2 text-center text-6xl" aria-hidden="true">{String(payload.visual)}</div>}
        {!isResponseRecall && !payload.scenario && !imageUrl && <p className="mt-3 text-center text-lg font-black leading-7">{String(payload.prompt)}</p>}

        {(activity.type === "LISTEN_CHOOSE" || activity.type === "LISTEN_TYPE") && <div className="mt-6 text-center"><button type="button" onClick={() => speakEnglish(String(payload.text || ""))} className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-sky-100 px-6 py-3 font-black text-sky-900 hover:bg-sky-200"><span className="text-2xl">🔊</span> Nghe lại</button><p className="mt-2 text-xs font-bold text-slate-500">Từ tiếng Anh được giấu để em luyện nghe thật</p></div>}

        {activity.type === "FLASHCARD" && !(imageUrl && isHiddenGuess) && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
          {isHiddenGuess && !revealed ? <>
            {isAudioGuess ? <>
              <div className="text-5xl" aria-hidden="true">🎧</div>
              <button type="button" onClick={() => speakEnglish(String(payload.audioText || payload.front || ""))} className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-xl bg-sky-100 px-5 py-2.5 font-black text-sky-900 hover:bg-sky-200"><span className="text-xl">🔊</span> Nghe câu</button>
              <p className="mt-3 text-sm font-bold text-amber-950">Nghe kỹ và tự đoán trong đầu. Câu tiếng Anh vẫn đang được giấu.</p>
            </> : <>
              <button type="button" onClick={() => speakEnglish(String(payload.audioText || payload.front || ""))} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-100 px-4 py-2 font-black text-sky-900 hover:bg-sky-200"><span className="text-lg">🔊</span> Nghe từ</button>
              <p className="mt-2 text-sm font-bold text-amber-950">Nhìn tranh, nghe nếu cần và đoán trong đầu trước nhé.</p>
            </>}
            <button type="button" onClick={() => setRevealed(true)} className="mt-3 rounded-xl bg-amber-500 px-5 py-2.5 font-black text-amber-950 hover:bg-amber-400">Xem đáp án</button>
          </> : <>
            {Boolean(payload.visual) && <div className="text-5xl" aria-hidden="true">{String(payload.visual)}</div>}
            <p className="mt-2 text-3xl font-black text-slate-950">{String(payload.front)}</p>
            <p className="mt-1 text-lg font-bold text-amber-900">{String(payload.back)}</p>
            {Boolean(payload.example) && <p className="mt-2 text-sm text-slate-600">{String(payload.example)}</p>}
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={() => speakEnglish(String(payload.audioText || payload.front || ""))} className="min-h-11 rounded-xl bg-sky-100 px-4 py-2 font-black text-sky-900">🔊 Nghe lại</button>
              <button type="button" disabled={pending} onClick={() => void submit({ known: true })} className="min-h-11 rounded-xl bg-emerald-700 px-4 py-2 font-black text-white disabled:opacity-50">Em đoán đúng</button>
              <button type="button" disabled={pending} onClick={() => void submit({ known: false })} className="min-h-11 rounded-xl border border-amber-400 bg-white px-4 py-2 font-black text-amber-900 disabled:opacity-50">Em chưa nhớ</button>
            </div>
          </>}
        </div>}

        {(activity.type === "MULTIPLE_CHOICE" || activity.type === "LISTEN_CHOOSE") && <div className="mt-4 grid gap-2">{options.map((option, optionIndex) => <button type="button" onClick={() => setAnswer({ optionId: option.id })} key={option.id} className={`min-h-12 rounded-xl border p-3 text-left text-sm font-bold transition ${answer.optionId === option.id ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100" : "border-slate-200 hover:border-emerald-300"}`}><span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-[11px]">{String.fromCharCode(65 + optionIndex)}</span>{option.text}</button>)}</div>}

        {activity.type === "MATCHING" && <div className="mt-5 space-y-3">{pairs.map((pair) => <label key={pair.left} className="grid items-center gap-3 rounded-2xl bg-slate-50 p-3 sm:grid-cols-2"><strong>{pair.left}</strong><select className="rounded-xl border bg-white p-2" onChange={(event) => { const current = (answer.pairs || []) as Array<{ left: string; right: string }>; setAnswer({ pairs: [...current.filter((item) => item.left !== pair.left), { left: pair.left, right: event.target.value }] }); }}><option value="">Chọn nghĩa</option>{pairs.map((item) => <option key={item.right}>{item.right}</option>)}</select></label>)}</div>}

        {isResponseRecall && <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-sky-50 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-black uppercase tracking-wider text-emerald-700">Phản xạ không dịch</p>
            <p className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
              {recallSeconds > 0 ? `Tự nhớ trong ${recallSeconds} giây` : "Đến lượt em phản hồi"}
            </p>
          </div>

          {Boolean(payload.partnerLine) ? <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[11px] font-black uppercase tracking-wider text-sky-700">Người đối diện nói</p>
            <p className="mt-2 text-lg font-black leading-7 text-slate-950">{String(payload.partnerLine)}</p>
            <button type="button" onClick={() => speakEnglish(String(payload.partnerLine))} className="mt-3 min-h-10 rounded-xl bg-sky-100 px-4 py-2 text-sm font-black text-sky-900 hover:bg-sky-200">🔊 Nghe người đối diện</button>
          </div> : <div className="mt-4 rounded-2xl bg-white p-4 text-center shadow-sm">
            <p className="text-3xl" aria-hidden="true">💬</p>
            <p className="mt-1 font-black text-slate-950">Đến lượt em mở lời bằng tiếng Anh</p>
          </div>}

          <p className="mt-4 text-sm font-bold leading-6 text-slate-700">Nói cả cụm trong đầu trước, sau đó gõ câu em sẽ nói. Không ghép từng từ từ tiếng Việt.</p>

          {!imageUrl && (!hintVisible ? <button type="button" onClick={() => setHintVisible(true)} className="mt-3 min-h-10 rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-black text-amber-800 hover:bg-amber-50">Cần gợi ý tình huống?</button> : <div className="mt-3 rounded-xl bg-amber-50 p-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-amber-700">Gợi ý tiếng Việt — chỉ dùng khi cần</p>
            <p className="mt-1 text-sm font-bold leading-6 text-amber-950">{String(payload.scenario)}</p>
          </div>)}

          <label className="mt-4 block text-sm font-black text-slate-800" htmlFor={`reaction-${activity.id}`}>Câu phản hồi của em</label>
          <input
            id={`reaction-${activity.id}`}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3"
            placeholder="Gõ cả cụm tiếng Anh…"
            autoComplete="off"
            spellCheck={false}
            value={String(answer.text || "")}
            onChange={(event) => { setAnswer({ text: event.target.value }); setPronunciationFeedback(null); }}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => startSpeech(String(payload.target || ""), "text")} className="min-h-11 rounded-xl bg-purple-700 px-4 py-2 font-black text-white">🎙 Nói và nhận diện</button>
            {pronunciationFeedback && <button type="button" onClick={() => speakEnglish(String(payload.target || ""))} className="min-h-11 rounded-xl bg-sky-100 px-4 py-2 font-black text-sky-900">🔊 Nghe câu chuẩn</button>}
          </div>
          {speechError && <p className="mt-2 text-sm font-bold text-rose-700">{speechError}</p>}
          {pronunciationFeedback && <div aria-live="polite" className="mt-3 rounded-xl border border-purple-200 bg-white p-3">
            <p className="font-black text-purple-900">Độ khớp nhận diện: {pronunciationFeedback.score}%</p>
            <p className="mt-1 text-sm text-slate-700">{pronunciationFeedback.message}</p>
            {pronunciationFeedback.needsPractice.length > 0 && <p className="mt-1 text-sm font-bold text-amber-800">Từ cần nói rõ hơn: {pronunciationFeedback.needsPractice.join(", ")}</p>}
          </div>}
        </div>}

        {(activity.type === "LISTEN_TYPE" || (activity.type === "SENTENCE" && !isResponseRecall)) && <input
          className="mt-5 w-full rounded-2xl border border-slate-300 px-4 py-3"
          placeholder="Nhập câu tiếng Anh"
          autoComplete="off"
          spellCheck={false}
          value={String(answer.text || "")}
          onChange={(event) => setAnswer({ text: event.target.value })}
        />}

        {activity.type === "SPEAK_REPEAT" && <div className="mt-6 rounded-3xl bg-purple-50 p-6 text-center">
          <p className="text-sm font-black uppercase tracking-wider text-purple-700">Nghe → nhìn tình huống → nói ngay</p>
          <p className="mt-3 text-3xl font-black">{String(payload.target)}</p>
          {Boolean(payload.translation) && <p className="mt-2 text-slate-600">{String(payload.translation)}</p>}
          <div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => speakEnglish(String(payload.target || ""))} className="rounded-2xl bg-sky-100 px-5 py-3 font-black text-sky-900">🔊 Nghe mẫu</button><button type="button" onClick={() => startSpeech(String(payload.target || ""))} className="rounded-2xl bg-purple-700 px-5 py-3 font-black text-white">🎙 Nói ngay</button></div>
          <p className="mt-3 text-sm text-slate-600">{answer.transcript ? `Em đã nói: ${answer.transcript}` : answer.unsupported ? "Thiết bị không nhận dạng giọng nói. Em vẫn có thể nghe và nói theo; bài học không bị khóa." : "Giọng nói chỉ được nhận dạng trên thiết bị và không được lưu."}</p>
          {speechError && <p className="mt-2 text-sm font-bold text-rose-700">{speechError}</p>}
          {pronunciationFeedback && <div aria-live="polite" className="mt-3 rounded-xl bg-white p-3 text-left">
            <p className="font-black text-purple-900">Độ khớp nhận diện: {pronunciationFeedback.score}%</p>
            <p className="mt-1 text-sm">{pronunciationFeedback.message}</p>
            {pronunciationFeedback.needsPractice.length > 0 && <p className="mt-1 text-sm font-bold text-amber-800">Từ cần nói rõ hơn: {pronunciationFeedback.needsPractice.join(", ")}</p>}
          </div>}
        </div>}

        {activity.type === "SHORT_WRITING" && <textarea
          className="mt-5 min-h-36 w-full rounded-2xl border border-slate-300 px-4 py-3"
          placeholder={String(payload.prompt || "Viết câu trả lời của em")}
          value={String(answer.text || "")}
          onChange={(event) => setAnswer({ text: event.target.value })}
        />}

        {result ? <div aria-live="polite" className={`mt-4 rounded-2xl p-4 ${result.passed ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-amber-950"}`}>
          <p className="text-lg font-black">{result.passed ? `Chính xác! ${result.score} điểm` : `Chưa đúng rồi. Mình xem đáp án và thử lại nhé.`}</p>
          {Boolean(payload.explanation) && <p className="mt-3 font-bold">Đáp án: {String(payload.explanation)}</p>}
          {Boolean(payload.modelAnswer) && <p className="mt-2 text-sm leading-6">{String(payload.modelAnswer)}</p>}
          {isResponseRecall && <button type="button" onClick={() => speakEnglish(String(payload.target || ""))} className="mt-3 rounded-xl bg-sky-100 px-4 py-2.5 font-black text-sky-900">🔊 Nghe cụm đúng</button>}
          {result.passed && index < activities.length - 1 && <button type="button" onClick={() => resetActivity(index + 1)} className="mt-3 rounded-xl bg-emerald-700 px-4 py-2.5 font-black text-white">Phản xạ tiếp theo →</button>}
          {result.passed && index === activities.length - 1 && <Link href={completionHref} className="mt-3 inline-block rounded-xl bg-emerald-700 px-4 py-2.5 font-black text-white">{completionLabel}</Link>}
          {!result.passed && <button type="button" onClick={() => { setResult(null); setAnswer({}); setRevealed(false); setHintVisible(false); setImageHintVisible(false); setPronunciationFeedback(null); setSpeechError(""); }} className="mt-3 rounded-xl bg-amber-500 px-4 py-2.5 font-black">{isResponseRecall ? "Tự tạo câu lại" : "Nghe và đoán lại"}</button>}
        </div> : activity.type !== "FLASHCARD" && <button type="button" disabled={pending || Object.keys(answer).length === 0} onClick={() => void submit()} className="mt-4 min-h-12 rounded-xl bg-emerald-700 px-5 py-2.5 font-black text-white disabled:cursor-not-allowed disabled:opacity-40">{pending ? "Đang kiểm tra…" : "Kiểm tra phản xạ"}</button>}
      </div>
    </article>
  </section>;
}

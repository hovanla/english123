"use client";
import { useCallback, useEffect, useState } from "react";
import MatchingActivity from "@/components/matching-activity";

type Item = { id: string; dueAt: string; activity: { id: string; type: string; title: string; instruction: string; payload: Record<string, unknown> } };
function formatDueAt(value: string) { return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(value)); }
function speak(text: string) { if (!("speechSynthesis" in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "en-US"; utterance.rate = .78; window.speechSynthesis.speak(utterance); }
export default function ReviewList() {
  const [items, setItems] = useState<Item[]>([]); const [upcoming, setUpcoming] = useState<Item[]>([]); const [loading, setLoading] = useState(true); const [answer, setAnswer] = useState<Record<string, unknown>>({}); const [message, setMessage] = useState(""); const [revealed, setRevealed] = useState(false); const [celebrate, setCelebrate] = useState(false);
  const load = useCallback(async () => { setLoading(true); const response = await fetch("/api/review"); const data = await response.json(); setItems(data.items || []); setUpcoming(data.upcoming || []); setLoading(false); }, []);
  useEffect(() => { let active = true; fetch("/api/review").then((response) => response.json()).then((data) => { if (!active) return; setItems(data.items || []); setUpcoming(data.upcoming || []); setLoading(false); }); return () => { active = false; }; }, []);
  if (loading) return <p className="mt-5 rounded-2xl bg-white p-5">Đang tải lịch ôn tập…</p>;
  if (!items.length) return <section className="mt-5 rounded-3xl bg-white p-7 shadow-sm"><h2 className="text-2xl font-black">Em đã ôn xong lúc này 🎉</h2>{upcoming[0] ? <div className="mt-4 rounded-2xl bg-sky-50 p-4"><p className="text-xs font-black uppercase tracking-wider text-sky-700">Lần ôn tiếp theo</p><p className="mt-1 font-black">{upcoming[0].activity.title}</p><p className="mt-1 text-sm text-slate-700">Học lại lúc {formatDueAt(upcoming[0].dueAt)}</p></div> : <p className="mt-2 text-slate-600">Hãy tiếp tục học bài mới. Lịch ôn sẽ xuất hiện sau khi em làm hoạt động.</p>}</section>;
  const item = items[0]; const payload = item.activity.payload; const options = (payload.options || []) as Array<{ id: string; text: string }>;
  async function complete(currentAnswer = answer) { const response = await fetch("/api/review", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, answer: currentAnswer }) }); const data = await response.json(); if (!response.ok) { setMessage("Chưa lưu được kết quả. Em thử lại nhé."); return; } setCelebrate(item.activity.type === "MATCHING" && data.score === 100); setMessage(data.passed ? `Chính xác · ${data.score} điểm. Đã hẹn lần ôn tiếp theo.` : "Đã ghi nhận ‘Chưa nhớ’. Em sẽ học lại mục này sau 10 phút."); setTimeout(() => { setMessage(""); setAnswer({}); setRevealed(false); setCelebrate(false); void load(); }, 1500); }
  function defaultAnswer() { if (item.activity.type === "SPEAK_REPEAT") return { unsupported: true, confirmed: true }; return answer; }
  const pairs = (payload.pairs || []) as Array<{ left: string; right: string }>;
  const answerReady = item.activity.type === "MATCHING"
    ? ((answer.pairs || []) as Array<{ left: string; right: string }>).length === pairs.length
    : Object.keys(answer).length > 0 || item.activity.type === "SPEAK_REPEAT";
  const hiddenGuess = item.activity.type === "FLASHCARD" && ["AUDIO_GUESS", "VISUAL_GUESS"].includes(String(payload.mode));
  const responseRecall = item.activity.type === "SENTENCE" && payload.mode === "RESPONSE_RECALL";
  return <article className="mt-5 rounded-3xl bg-white p-7 shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Còn {items.length} mục</p><h2 className="mt-3 text-3xl font-black">{item.activity.title}</h2><p className="mt-2 text-slate-600">{item.activity.instruction}</p>
    {item.activity.type === "FLASHCARD" && <div className="mt-5 rounded-2xl bg-amber-50 p-7 text-center">{hiddenGuess && !revealed ? <><div className="text-6xl">{payload.mode === "AUDIO_GUESS" ? "🎧" : String(payload.visual || "✨")}</div>{payload.mode === "AUDIO_GUESS" && <button type="button" onClick={() => speak(String(payload.audioText || payload.front || ""))} className="mt-4 rounded-xl bg-sky-100 px-5 py-3 font-black text-sky-900">🔊 Nghe câu</button>}<p className="mt-3 font-bold">Tự đoán trước khi xem đáp án.</p><button type="button" onClick={() => setRevealed(true)} className="mt-4 rounded-xl bg-amber-500 px-5 py-3 font-black">Xem đáp án</button></> : <><p className="text-4xl font-black">{String(payload.front)}</p><p className="mt-3 text-xl">{String(payload.back)}</p><div className="mt-5 flex flex-wrap justify-center gap-2"><button type="button" onClick={() => speak(String(payload.audioText || payload.front || ""))} className="rounded-xl bg-sky-100 px-4 py-2 font-black text-sky-900">🔊 Nghe lại</button><button type="button" onClick={() => void complete({ known: true })} className="rounded-xl bg-emerald-700 px-4 py-2 font-black text-white">Em đoán đúng</button><button type="button" onClick={() => void complete({ known: false })} className="rounded-xl border border-amber-400 bg-white px-4 py-2 font-black">Em chưa nhớ</button></div></>}</div>}
    {["MULTIPLE_CHOICE", "LISTEN_CHOOSE"].includes(item.activity.type) && <div className="mt-5 grid gap-2">{options.map((option) => <button key={option.id} onClick={() => setAnswer({ optionId: option.id })} className={`rounded-xl border p-3 text-left font-bold ${answer.optionId === option.id ? "border-emerald-600 bg-emerald-50" : ""}`}>{option.text}</button>)}</div>}
    {responseRecall && <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <p className="text-xs font-black uppercase tracking-wider text-emerald-700">Ôn phản xạ — không dịch từng từ</p>
      {Boolean(payload.partnerLine) ? <div className="mt-3 rounded-xl bg-white p-3"><p className="text-xs font-black uppercase text-sky-700">Người đối diện nói</p><p className="mt-1 text-lg font-black">{String(payload.partnerLine)}</p><button type="button" onClick={() => speak(String(payload.partnerLine))} className="mt-2 rounded-lg bg-sky-100 px-3 py-2 text-sm font-black text-sky-900">🔊 Nghe</button></div> : <p className="mt-3 rounded-xl bg-white p-3 text-center font-black">Đến lượt em mở lời bằng tiếng Anh</p>}
      {!revealed ? <button type="button" onClick={() => setRevealed(true)} className="mt-3 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-black text-amber-800">Cần gợi ý tình huống?</button> : <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm font-bold text-amber-950">{String(payload.scenario)}</p>}
    </div>}
    {["LISTEN_TYPE", "SENTENCE"].includes(item.activity.type) && <input className="mt-5 w-full rounded-xl border p-3" placeholder={responseRecall ? "Gõ cả cụm tiếng Anh em sẽ nói…" : "Nhập câu tiếng Anh"} autoComplete="off" value={String(answer.text || "")} onChange={(event) => setAnswer({ text: event.target.value })}/>}
    {item.activity.type === "MATCHING" && <MatchingActivity
      pairs={pairs}
      selectedPairs={(answer.pairs || []) as Array<{ left: string; right: string }>}
      shuffleKey={item.activity.id}
      celebrate={celebrate}
      onChange={(left, right) => {
        const current = (answer.pairs || []) as Array<{ left: string; right: string }>;
        setAnswer({ pairs: [...current.filter((value) => value.left !== left), ...(right ? [{ left, right }] : [])] });
      }}
    />}
    {item.activity.type === "SHORT_WRITING" && <textarea className="mt-5 min-h-32 w-full rounded-xl border p-3" value={String(answer.text || "")} onChange={(event) => setAnswer({ text: event.target.value })}/>} 
    {message && <p className="mt-4 rounded-xl bg-emerald-50 p-3 font-bold">{message}</p>}{item.activity.type !== "FLASHCARD" && <button disabled={!answerReady} onClick={() => { const current = Object.keys(answer).length ? answer : defaultAnswer(); setAnswer(current); void complete(current); }} className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 font-black text-white disabled:cursor-not-allowed disabled:opacity-40">Kiểm tra và hẹn lần tiếp</button>}
  </article>;
}

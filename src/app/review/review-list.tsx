"use client";
import { useCallback, useEffect, useState } from "react";

type Item = { id: string; activity: { id: string; type: string; title: string; instruction: string; payload: Record<string, unknown> } };
export default function ReviewList() {
  const [items, setItems] = useState<Item[]>([]); const [loading, setLoading] = useState(true); const [answer, setAnswer] = useState<Record<string, unknown>>({}); const [message, setMessage] = useState("");
  const load = useCallback(async () => { setLoading(true); const response = await fetch("/api/review"); const data = await response.json(); setItems(data.items || []); setLoading(false); }, []);
  useEffect(() => { let active = true; fetch("/api/review").then((response) => response.json()).then((data) => { if (!active) return; setItems(data.items || []); setLoading(false); }); return () => { active = false; }; }, []);
  if (loading) return <p className="mt-5 rounded-2xl bg-white p-5">Đang tải lịch ôn tập…</p>;
  if (!items.length) return <section className="mt-5 rounded-3xl bg-white p-7 shadow-sm"><h2 className="text-2xl font-black">Em đã ôn xong hôm nay 🎉</h2><p className="mt-2 text-slate-600">Hãy tiếp tục học bài mới. English123 sẽ nhắc khi đến lịch ôn tiếp theo.</p></section>;
  const item = items[0]; const payload = item.activity.payload; const options = (payload.options || []) as Array<{ id: string; text: string }>;
  async function complete(currentAnswer = answer) { const response = await fetch("/api/review", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, answer: currentAnswer }) }); const data = await response.json(); if (data.passed) { setMessage(`Chính xác · ${data.score} điểm`); setTimeout(() => { setMessage(""); setAnswer({}); void load(); }, 800); } else setMessage(`Em đạt ${data.score} điểm. Hãy thử lại.`); }
  function defaultAnswer() { if (item.activity.type === "FLASHCARD") return { known: true }; if (item.activity.type === "SPEAK_REPEAT") return { unsupported: true, confirmed: true }; return answer; }
  const pairs = (payload.pairs || []) as Array<{ left: string; right: string }>;
  return <article className="mt-5 rounded-3xl bg-white p-7 shadow-sm"><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Còn {items.length} mục</p><h2 className="mt-3 text-3xl font-black">{item.activity.title}</h2><p className="mt-2 text-slate-600">{item.activity.instruction}</p>
    {item.activity.type === "FLASHCARD" && <div className="mt-5 rounded-2xl bg-amber-50 p-7 text-center"><p className="text-4xl font-black">{String(payload.front)}</p><p className="mt-3 text-xl">{String(payload.back)}</p></div>}
    {["MULTIPLE_CHOICE", "LISTEN_CHOOSE"].includes(item.activity.type) && <div className="mt-5 grid gap-2">{options.map((option) => <button key={option.id} onClick={() => setAnswer({ optionId: option.id })} className={`rounded-xl border p-3 text-left font-bold ${answer.optionId === option.id ? "border-emerald-600 bg-emerald-50" : ""}`}>{option.text}</button>)}</div>}
    {["LISTEN_TYPE", "SENTENCE"].includes(item.activity.type) && <input className="mt-5 w-full rounded-xl border p-3" value={String(answer.text || "")} onChange={(event) => setAnswer({ text: event.target.value })}/>} 
    {item.activity.type === "MATCHING" && <div className="mt-5 space-y-2">{pairs.map((pair) => <label className="grid gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-2" key={pair.left}><strong>{pair.left}</strong><select className="rounded-lg border bg-white p-2" onChange={(event) => { const current = (answer.pairs || []) as Array<{ left: string; right: string }>; setAnswer({ pairs: [...current.filter((value) => value.left !== pair.left), { left: pair.left, right: event.target.value }] }); }}><option value="">Chọn nghĩa</option>{pairs.map((value) => <option key={value.right}>{value.right}</option>)}</select></label>)}</div>}
    {item.activity.type === "SHORT_WRITING" && <textarea className="mt-5 min-h-32 w-full rounded-xl border p-3" value={String(answer.text || "")} onChange={(event) => setAnswer({ text: event.target.value })}/>} 
    {message && <p className="mt-4 rounded-xl bg-emerald-50 p-3 font-bold">{message}</p>}<button onClick={() => { const current = Object.keys(answer).length ? answer : defaultAnswer(); setAnswer(current); void complete(current); }} className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 font-black text-white">Kiểm tra và hẹn lần tiếp</button>
  </article>;
}

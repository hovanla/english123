"use client";

import { useEffect, type CSSProperties } from "react";
import { buildMatchingOrder } from "@/lib/matching-order";

type Pair = { left: string; right: string };
const particleColors = ["#10b981", "#38bdf8", "#f59e0b", "#f43f5e", "#8b5cf6", "#facc15"];
const particles = Array.from({ length: 28 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 28;
  const distance = 54 + (index % 4) * 18;
  return {
    x: `${Math.cos(angle) * distance}px`,
    y: `${Math.sin(angle) * distance}px`,
    color: particleColors[index % particleColors.length],
    delay: `${(index % 5) * 18}ms`,
  };
});

function playCorrectSound(complete: boolean) {
  const AudioContextClass = window.AudioContext
    || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const now = context.currentTime;
  const notes = complete ? [523.25, 659.25, 783.99, 1046.5] : [659.25, 880];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.09;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(complete ? 0.15 : 0.1, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.2);
  });
  window.setTimeout(() => void context.close(), complete ? 750 : 450);
}

export default function MatchingActivity({ pairs, selectedPairs, shuffleKey, celebrate = false, onChange }: { pairs: Pair[]; selectedPairs: Pair[]; shuffleKey: string; celebrate?: boolean; onChange: (left: string, right: string) => void }) {
  const selectedByWord = new Map(selectedPairs.map((pair) => [pair.left, pair.right]));
  const selectedMeanings = new Set(selectedPairs.map((pair) => pair.right));
  const completed = pairs.filter((pair) => selectedByWord.get(pair.left)).length;
  const percent = pairs.length ? (completed / pairs.length) * 100 : 0;
  const { rows, meanings } = buildMatchingOrder(pairs, shuffleKey);

  useEffect(() => {
    if (celebrate) playCorrectSound(true);
  }, [celebrate]);

  return <section className="relative mt-4 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white p-3 sm:p-4">
    {celebrate && <div className="matching-celebration matching-celebration-complete" aria-hidden="true">
      <div className="matching-firework">{particles.map((particle, index) => <span
        key={index}
        className="matching-firework-particle"
        style={{ "--firework-x": particle.x, "--firework-y": particle.y, "--firework-color": particle.color, "--firework-delay": particle.delay } as CSSProperties}
      />)}</div>
    </div>}
    <p className="sr-only" aria-live="polite">{celebrate ? "Chính xác! Em đã ghép đúng tất cả các từ." : ""}</p>
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Ghép từ với nghĩa</p>
        <p className="mt-0.5 text-sm font-bold text-slate-600">Chọn nghĩa phù hợp cho từng từ</p>
      </div>
      <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-black text-emerald-800 shadow-sm">{completed}/{pairs.length}</span>
    </div>
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-100"><span className="block h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${percent}%` }}/></div>

    <div className="mt-3 grid gap-2 lg:grid-cols-2">
      {rows.map((pair, index) => {
        const selected = selectedByWord.get(pair.left) || "";
        return <label key={pair.left} className={`grid min-h-16 grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] items-center gap-2 rounded-xl border bg-white p-2.5 transition sm:gap-3 sm:p-3 ${selected ? "border-emerald-300 shadow-sm" : "border-slate-200"}`}>
          <span className="flex min-w-0 items-center gap-2">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-black ${selected ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-800"}`}>{selected ? "✓" : index + 1}</span>
            <strong className="break-words text-sm leading-5 text-slate-950 sm:text-base">{pair.left}</strong>
          </span>
          <span className="relative min-w-0">
            <select
              aria-label={`Nghĩa của ${pair.left}`}
              value={selected}
              onChange={(event) => onChange(pair.left, event.target.value)}
              className={`min-h-11 w-full appearance-none rounded-lg border bg-white py-2 pl-3 pr-8 text-sm font-bold outline-none transition focus:ring-4 ${selected ? "border-emerald-300 text-emerald-950 focus:border-emerald-600 focus:ring-emerald-100" : "border-slate-300 text-slate-600 focus:border-sky-500 focus:ring-sky-100"}`}
            >
              <option value="">Chọn nghĩa…</option>
              {meanings.map((meaning) => <option key={meaning} value={meaning} disabled={meaning !== selected && selectedMeanings.has(meaning)}>{meaning}</option>)}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-700">▼</span>
          </span>
        </label>;
      })}
    </div>
  </section>;
}

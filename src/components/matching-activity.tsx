"use client";

type Pair = { left: string; right: string };

export default function MatchingActivity({ pairs, selectedPairs, onChange }: { pairs: Pair[]; selectedPairs: Pair[]; onChange: (left: string, right: string) => void }) {
  const selectedByWord = new Map(selectedPairs.map((pair) => [pair.left, pair.right]));
  const selectedMeanings = new Set(selectedPairs.map((pair) => pair.right));
  const completed = pairs.filter((pair) => selectedByWord.get(pair.left)).length;
  const percent = pairs.length ? (completed / pairs.length) * 100 : 0;

  return <section className="mt-4 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white p-3 sm:p-4">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Ghép từ với nghĩa</p>
        <p className="mt-0.5 text-sm font-bold text-slate-600">Chọn nghĩa phù hợp cho từng từ</p>
      </div>
      <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-black text-emerald-800 shadow-sm">{completed}/{pairs.length}</span>
    </div>
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-100"><span className="block h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${percent}%` }}/></div>

    <div className="mt-3 grid gap-2 lg:grid-cols-2">
      {pairs.map((pair, index) => {
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
              {pairs.map((item) => <option key={item.right} value={item.right} disabled={item.right !== selected && selectedMeanings.has(item.right)}>{item.right}</option>)}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-700">▼</span>
          </span>
        </label>;
      })}
    </div>
  </section>;
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type UnitOption = {
  id: string;
  slug: string;
  order: number;
  title: string;
  theme: string;
};

export default function UnitNavigator({ gradeName, gradeSlug, units, currentUnitId }: { gradeName: string; gradeSlug: string; units: UnitOption[]; currentUnitId: string }) {
  const router = useRouter();
  const currentIndex = units.findIndex((unit) => unit.id === currentUnitId);
  const currentUnit = units[currentIndex];
  const previousUnit = currentIndex > 0 ? units[currentIndex - 1] : null;
  const nextUnit = currentIndex < units.length - 1 ? units[currentIndex + 1] : null;
  const hrefFor = (slug: string) => `/learn/${gradeSlug}/${slug}`;

  return <section className="mt-3 rounded-2xl bg-white p-3 shadow-sm">
    <div className="md:hidden">
      <div className="flex items-end justify-between gap-3">
        <div><p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Lộ trình {gradeName}</p><p className="mt-0.5 text-xs font-bold text-slate-500">Đang học Unit {currentUnit?.order}/{units.length}</p></div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">{currentUnit?.theme}</span>
      </div>
      <label htmlFor="mobile-unit-picker" className="mt-3 block text-xs font-black text-slate-700">Chọn Unit muốn học</label>
      <div className="relative mt-1.5">
        <select
          id="mobile-unit-picker"
          value={currentUnit ? hrefFor(currentUnit.slug) : ""}
          onChange={(event) => router.push(event.target.value)}
          className="min-h-12 w-full appearance-none rounded-xl border-2 border-emerald-200 bg-white py-2.5 pl-4 pr-11 text-sm font-black text-slate-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        >
          {units.map((unit) => <option key={unit.id} value={hrefFor(unit.slug)}>Unit {unit.order}: {unit.title} — {unit.theme}</option>)}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700">▼</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {previousUnit ? <Link href={hrefFor(previousUnit.slug)} className="flex min-h-11 items-center justify-center rounded-xl bg-slate-100 px-3 text-center text-sm font-black text-slate-700">← Unit {previousUnit.order}</Link> : <span className="flex min-h-11 items-center justify-center rounded-xl bg-slate-50 px-3 text-sm font-bold text-slate-400">Unit đầu tiên</span>}
        {nextUnit ? <Link href={hrefFor(nextUnit.slug)} className="flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-3 text-center text-sm font-black text-white">Unit {nextUnit.order} →</Link> : <span className="flex min-h-11 items-center justify-center rounded-xl bg-slate-50 px-3 text-sm font-bold text-slate-400">Unit cuối cùng</span>}
      </div>
    </div>

    <div className="hidden items-center gap-3 md:flex">
      <div className="shrink-0"><p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Lộ trình {gradeName}</p><p className="text-xs font-bold text-slate-500">Unit {currentUnit?.order}/{units.length}</p></div>
      <div className="flex gap-1.5 overflow-x-auto py-0.5">{units.map((unit) => <Link key={unit.id} href={hrefFor(unit.slug)} title={`${unit.title} · ${unit.theme}`} aria-label={`Unit ${unit.order}: ${unit.title}`} aria-current={unit.id === currentUnitId ? "page" : undefined} className={`grid h-9 min-w-9 place-items-center rounded-lg text-xs font-black ${unit.id === currentUnitId ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-emerald-50"}`}>{unit.order}</Link>)}</div>
    </div>
  </section>;
}

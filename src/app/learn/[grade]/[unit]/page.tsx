import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getPublishedUnit } from "@/lib/curriculum";
import LessonPlayer from "./lesson-player";

export const dynamic = "force-dynamic";
export default async function UnitPage({ params }: { params: Promise<{ grade: string; unit: string }> }) {
  const session = await auth(); if (!session?.user?.id) redirect("/login");
  const { grade, unit } = await params; const data = await getPublishedUnit(grade, unit); if (!data) notFound();
  const serialized = JSON.parse(JSON.stringify(data.lessons));
  return <main className="min-h-screen bg-[#f5f8f5] text-[#163129]"><header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5"><Link href="/dashboard" className="font-black">← Bảng học</Link><Link href="/review" className="text-sm font-bold">Ôn tập</Link></div></header><div className="mx-auto max-w-6xl px-4 py-3"><section className="grid overflow-hidden rounded-2xl bg-emerald-900 text-white md:grid-cols-[1fr_220px]"><div className="p-4"><p className="text-[11px] font-black uppercase tracking-wider text-emerald-300">{data.course.grade.name} · Unit {data.order} · {data.theme}</p><div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1"><h1 className="text-2xl font-black">{data.title}</h1><p className="text-xs font-bold">{data.lessons.length} lesson · khoảng {data.lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)} phút</p></div><p className="mt-1.5 max-w-2xl text-sm leading-5 text-emerald-50/80">{data.description}</p></div><div className="relative hidden min-h-28 md:block">{data.imageUrl && <Image src={data.imageUrl} alt={`Hình minh họa ${data.theme}`} fill sizes="220px" className="object-cover"/>}</div></section>
    <section className="mt-3 rounded-2xl bg-white p-3 shadow-sm"><div className="flex items-center gap-3"><div className="shrink-0"><p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Lộ trình {data.course.grade.name}</p><p className="text-xs font-bold text-slate-500">Unit {data.order}/{data.course.units.length}</p></div><div className="flex gap-1.5 overflow-x-auto py-0.5">{data.course.units.map((item) => <Link key={item.id} href={`/learn/${data.course.grade.slug}/${item.slug}`} title={`${item.title} · ${item.theme}`} aria-label={`Unit ${item.order}: ${item.title}`} className={`grid h-8 min-w-8 place-items-center rounded-lg text-[11px] font-black ${item.id === data.id ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-emerald-50"}`}>{item.order}</Link>)}</div></div></section>
    <LessonPlayer lessons={serialized}/></div></main>;
}

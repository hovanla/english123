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
  return <main className="min-h-screen bg-[#f5f8f5] text-[#163129]"><header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"><Link href="/dashboard" className="font-black">← Bảng học</Link><Link href="/review" className="text-sm font-bold">Ôn tập</Link></div></header><div className="mx-auto max-w-6xl px-4 py-7"><section className="grid overflow-hidden rounded-[2rem] bg-emerald-900 text-white md:grid-cols-[1fr_360px]"><div className="p-7 md:p-10"><p className="text-sm font-black uppercase tracking-wider text-emerald-300">{data.course.grade.name} · Unit {data.order} · {data.theme}</p><h1 className="mt-3 text-4xl font-black">{data.title}</h1><p className="mt-3 max-w-xl leading-7 text-emerald-50/80">{data.description}</p><p className="mt-5 text-sm font-bold">{data.lessons.length} lesson · khoảng {data.lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)} phút</p></div><div className="relative min-h-56">{data.imageUrl && <Image src={data.imageUrl} alt={`Hình minh họa ${data.theme}`} fill sizes="(max-width:768px) 100vw, 360px" className="object-cover"/>}</div></section>
    <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm"><div className="flex flex-wrap items-end justify-between gap-2"><div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Lộ trình {data.course.grade.name}</p><h2 className="mt-1 text-xl font-black">{data.course.units.length} unit theo thứ tự</h2></div><span className="text-sm font-bold text-slate-500">Đang học {data.order}/{data.course.units.length}</span></div><div className="mt-4 flex gap-2 overflow-x-auto pb-2">{data.course.units.map((item) => <Link key={item.id} href={`/learn/${data.course.grade.slug}/${item.slug}`} title={`${item.title} · ${item.theme}`} className={`grid h-11 min-w-11 place-items-center rounded-xl text-sm font-black ${item.id === data.id ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-emerald-50"}`}>{item.order}</Link>)}</div></section>
    <LessonPlayer lessons={serialized}/></div></main>;
}

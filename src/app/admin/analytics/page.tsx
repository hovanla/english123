import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { daysAgo } from "@/lib/time";

export const dynamic = "force-dynamic";
export default async function AnalyticsPage() {
  const session = await auth(); if (!session?.user || session.user.role !== Role.ADMIN) redirect("/admin");
  const since = daysAgo(7);
  const [started, completed, returned, reviews] = await Promise.all([
    prisma.productEvent.count({ where: { name: "lesson_started", createdAt: { gte: since } } }),
    prisma.productEvent.count({ where: { name: "lesson_completed", createdAt: { gte: since } } }),
    prisma.productEvent.groupBy({ by: ["learnerProfileId"], where: { createdAt: { gte: since }, learnerProfileId: { not: null } }, _count: true }),
    prisma.productEvent.count({ where: { name: "review_completed", createdAt: { gte: since } } }),
  ]);
  const returning = returned.filter((item) => item._count >= 2).length;
  return <main className="min-h-screen bg-slate-100 p-4"><div className="mx-auto max-w-5xl py-8"><a href="/admin" className="font-black text-emerald-700">← CMS</a><h1 className="mt-5 text-4xl font-black">Sức khỏe pilot · 7 ngày</h1><div className="mt-7 grid gap-4 sm:grid-cols-4">{[["Bắt đầu lesson", started], ["Hoàn thành lesson", completed], ["Học sinh quay lại", returning], ["Lượt ôn hoàn thành", reviews]].map(([label, value]) => <article key={label} className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></article>)}</div><p className="mt-6 rounded-2xl bg-white p-5">Tỷ lệ hoàn thành lesson: <strong>{started ? Math.round((completed / started) * 100) : 0}%</strong>. Mục tiêu pilot: 60%.</p></div></main>;
}

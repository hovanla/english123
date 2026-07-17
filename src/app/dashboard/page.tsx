import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "../../../auth";
import { prisma } from "@/lib/prisma";
import { getActiveLearner } from "@/lib/learner";
import ProfilePicker from "./profile-picker";
import { daysAgo } from "@/lib/time";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/dashboard");
  const profiles = await prisma.learnerProfile.findMany({ where: { userId: session.user.id, active: true }, include: { grade: true }, orderBy: { createdAt: "asc" } });
  if (!profiles.length) redirect("/register");
  const learner = await getActiveLearner();
  const course = learner.gradeId ? await prisma.course.findFirst({
    where: { gradeId: learner.gradeId, status: "PUBLISHED" },
    include: { grade: true, units: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" }, include: { lessons: { where: { status: "PUBLISHED" }, orderBy: { order: "asc" }, include: { progress: { where: { learnerProfileId: learner.id } } } } } } },
  }) : null;
  const dueReviews = await prisma.reviewSchedule.count({ where: { learnerProfileId: learner.id, dueAt: { lte: new Date() } } });
  const recent = await prisma.lessonProgress.findMany({ where: { learnerProfileId: learner.id }, include: { lesson: { include: { unit: { include: { course: { include: { grade: true } } } } } } }, orderBy: { lastActivityAt: "desc" }, take: 3 });
  const studyDays = await prisma.productEvent.findMany({ where: { learnerProfileId: learner.id, createdAt: { gte: daysAgo(14) } }, select: { createdAt: true } });
  const streak = new Set(studyDays.map((item) => item.createdAt.toISOString().slice(0, 10))).size;

  return <main className="min-h-screen bg-[#f5f8f5] text-[#163129]"><header className="border-b bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"><Link href="/" className="font-black">English123</Link><form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}><button className="text-sm font-bold text-slate-600">Đăng xuất</button></form></div></header>
    <div className="mx-auto max-w-7xl px-4 py-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-bold text-emerald-700">Bảng học của em</p><h1 className="mt-1 text-4xl font-black">Xin chào, {learner.displayName}!</h1><p className="mt-2 text-slate-600">{learner.grade?.name || "Chưa chọn lớp"} · Mỗi ngày một bài ngắn nhé.</p></div><ProfilePicker profiles={profiles.map(({ id, displayName, grade }) => ({ id, displayName, gradeName: grade?.name || "" }))}/></div>
      <section className="mt-7 grid gap-4 sm:grid-cols-3"><article className="rounded-3xl bg-emerald-800 p-6 text-white"><p className="text-sm text-emerald-100">Ôn tập hôm nay</p><p className="mt-2 text-4xl font-black">{dueReviews}</p><Link href="/review" className="mt-5 inline-block rounded-xl bg-white px-4 py-2 text-sm font-black text-emerald-800">Ôn ngay</Link></article><article className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-sm text-slate-500">Ngày học trong 14 ngày</p><p className="mt-2 text-4xl font-black">{streak}</p></article><article className="rounded-3xl bg-[#ffefd0] p-6"><p className="text-sm text-amber-800">Lộ trình hiện tại</p><p className="mt-2 text-2xl font-black">{course?.title || "Sắp mở"}</p></article></section>
      <section className="mt-10"><h2 className="text-2xl font-black">Bài học của em</h2>{!course ? <p className="mt-4 rounded-2xl bg-white p-5">Lộ trình cho cấp lớp này đang được biên soạn.</p> : <div className="mt-4 grid gap-5 md:grid-cols-2">{course.units.map((unit) => { const progresses = unit.lessons.map((lesson) => lesson.progress[0]?.percent || 0); const percent = progresses.length ? Math.round(progresses.reduce((sum, value) => sum + value, 0) / progresses.length) : 0; return <article key={unit.id} className="rounded-3xl bg-white p-6 shadow-sm"><div className="flex justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">{unit.theme}</p><h3 className="mt-2 text-xl font-black">{unit.title}</h3></div><strong>{percent}%</strong></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-emerald-600" style={{ width: `${percent}%` }}/></div><p className="mt-3 text-sm text-slate-600">{unit.lessons.length} lesson · {unit.description}</p><Link href={`/learn/${course.grade.slug}/${unit.slug}`} className="mt-5 inline-block rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white">{percent ? "Học tiếp" : "Bắt đầu"}</Link></article>; })}</div>}</section>
      {recent.length > 0 && <section className="mt-10"><h2 className="text-xl font-black">Hoạt động gần đây</h2><div className="mt-3 space-y-2">{recent.map((item) => <p key={item.id} className="rounded-2xl bg-white p-4 text-sm"><strong>{item.lesson.title}</strong> · {item.percent}% · {item.lesson.unit.title}</p>)}</div></section>}
    </div></main>;
}

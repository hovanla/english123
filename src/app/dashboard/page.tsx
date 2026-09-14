import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "../../../auth";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import { daysAgo } from "@/lib/time";
import ProfilePicker from "./profile-picker";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/dashboard");

  const profiles = await prisma.learnerProfile.findMany({
    where: { userId: session.user.id, active: true },
    include: { grade: true },
    orderBy: { createdAt: "asc" },
  });
  if (!profiles.length) redirect("/register");

  const learner = await getActiveLearner();
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
      ...(learner.gradeId
        ? { OR: [{ gradeId: learner.gradeId }, { grade: { slug: { in: ["giao-tiep-mat-goc", "tieng-anh-co-ban"] } } }] }
        : {}),
    },
    include: {
      grade: true,
      units: {
        where: { status: "PUBLISHED" },
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { status: "PUBLISHED" },
            orderBy: { order: "asc" },
            include: { progress: { where: { learnerProfileId: learner.id } } },
          },
        },
      },
    },
    orderBy: [{ grade: { order: "asc" } }, { order: "asc" }],
  });

  const now = new Date();
  const [dueReviews, nextReview, recent, studyDays] = await Promise.all([
    prisma.reviewSchedule.count({ where: { learnerProfileId: learner.id, dueAt: { lte: now } } }),
    prisma.reviewSchedule.findFirst({
      where: { learnerProfileId: learner.id, dueAt: { gt: now } },
      select: { dueAt: true, activity: { select: { title: true } } },
      orderBy: { dueAt: "asc" },
    }),
    prisma.lessonProgress.findMany({
      where: { learnerProfileId: learner.id },
      include: { lesson: { include: { unit: { include: { course: { include: { grade: true } } } } } } },
      orderBy: { lastActivityAt: "desc" },
      take: 3,
    }),
    prisma.productEvent.findMany({ where: { learnerProfileId: learner.id, createdAt: { gte: daysAgo(14) } }, select: { createdAt: true } }),
  ]);
  const streak = new Set(studyDays.map((item) => item.createdAt.toISOString().slice(0, 10))).size;
  const continueItem = recent[0];
  const nextReviewLabel = nextReview ? new Intl.DateTimeFormat("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", dateStyle: "short", timeStyle: "short" }).format(nextReview.dueAt) : null;

  return <main className="min-h-screen bg-[#f5f8f5] text-[#163129]">
    <header className="sticky top-0 z-20 border-b border-emerald-950/10 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5"><Link href="/" className="flex items-center gap-2 font-black"><span className="grid size-8 place-items-center rounded-xl bg-emerald-700 text-sm text-white">E</span><span>English123</span></Link><form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}><button className="min-h-10 rounded-xl px-3 text-sm font-bold text-slate-600 hover:bg-slate-100">Đăng xuất</button></form></div></header>
    <div className="mx-auto max-w-6xl px-4 py-5 sm:py-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Bảng học của em</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">Xin chào, {learner.displayName}!</h1><p className="mt-1 text-sm text-slate-600">{learner.grade?.name || "Tự do chọn lộ trình"} · Mỗi ngày một bài ngắn nhé.</p></div><ProfilePicker profiles={profiles.map(({ id, displayName, grade }) => ({ id, displayName, gradeName: grade?.name || "Tự chọn" }))}/></div>

      <Link href="/pronunciation" className="mt-4 flex min-h-14 items-center justify-between rounded-2xl bg-violet-100 px-4 py-3 text-violet-950"><span><strong>🎙 Học phát âm</strong><span className="mt-1 block text-xs">55 bài Anh–Mỹ · Bảng âm, luyện đọc và lưu tiến độ</span></span><span aria-hidden="true">→</span></Link>
      <section className="mt-5 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
        {continueItem && <div className="flex flex-col gap-3 bg-sky-950 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="min-w-0"><p className="text-[11px] font-black uppercase tracking-wider text-sky-300">Học tiếp từ lần trước</p><h2 className="mt-1 truncate text-lg font-black sm:text-xl">{continueItem.lesson.unit.title} · {continueItem.lesson.title}</h2><p className="mt-0.5 text-xs text-sky-100">Đã lưu {continueItem.percent}% · mở lại đúng bước gần nhất</p></div><Link href={`/learn/${continueItem.lesson.unit.course.grade.slug}/${continueItem.lesson.unit.slug}`} className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl bg-white px-4 text-sm font-black text-sky-950 hover:bg-sky-50">Học tiếp →</Link></div>}

        <div className="grid grid-cols-3 divide-x divide-slate-100">
          <Link href="/review" className="group min-w-0 px-2 py-3 text-center hover:bg-emerald-50 sm:px-5 sm:text-left"><div className="flex items-center justify-center gap-2 sm:justify-start"><span className="hidden size-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-base sm:grid" aria-hidden="true">↻</span><div className="min-w-0"><p className="text-[10px] font-bold leading-tight text-slate-500 sm:text-xs">Ôn đến hạn</p><p className="text-xl font-black text-emerald-800 sm:text-2xl">{dueReviews}</p></div></div><p className="mt-1 hidden truncate text-[10px] text-slate-500 sm:block">{dueReviews > 0 ? "Ôn ngay hôm nay" : nextReviewLabel ? `Tiếp theo: ${nextReviewLabel}` : "Chưa có lịch ôn"}</p></Link>
          <article className="min-w-0 px-2 py-3 text-center sm:px-5 sm:text-left"><div className="flex items-center justify-center gap-2 sm:justify-start"><span className="hidden size-8 shrink-0 place-items-center rounded-lg bg-sky-100 text-base sm:grid" aria-hidden="true">✓</span><div className="min-w-0"><p className="text-[10px] font-bold leading-tight text-slate-500 sm:text-xs">Ngày học / 14</p><p className="text-xl font-black sm:text-2xl">{streak}</p></div></div><p className="mt-1 hidden text-[10px] text-slate-500 sm:block">Duy trì thói quen mỗi ngày</p></article>
          <article className="min-w-0 px-2 py-3 text-center sm:px-5 sm:text-left"><div className="flex items-center justify-center gap-2 sm:justify-start"><span className="hidden size-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-base sm:grid" aria-hidden="true">▤</span><div className="min-w-0"><p className="text-[10px] font-bold leading-tight text-slate-500 sm:text-xs">Lộ trình</p><p className="text-xl font-black sm:text-2xl">{courses.length}</p></div></div><p className="mt-1 hidden text-[10px] text-slate-500 sm:block">Chọn chương trình phù hợp</p></article>
        </div>
      </section>

      <section className="mt-6"><div><p className="text-xs font-black uppercase tracking-wider text-emerald-700">Chọn chương trình</p><h2 className="mt-1 text-xl font-black sm:text-2xl">Học theo lộ trình phù hợp</h2><p className="mt-1 max-w-3xl text-sm text-slate-600">Em có thể học và lưu tiến độ ở mọi chương trình đang mở.</p></div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{courses.map((course) => {
          const lessonProgress = course.units.flatMap((unit) => unit.lessons.map((lesson) => lesson.progress[0]?.percent || 0));
          const percent = lessonProgress.length ? Math.round(lessonProgress.reduce((sum, value) => sum + value, 0) / lessonProgress.length) : 0;
          const nextUnit = course.units.find((unit) => unit.lessons.some((lesson) => (lesson.progress[0]?.percent || 0) < 100)) || course.units[0];
          return <article key={course.id} className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[11px] font-black uppercase tracking-wider text-emerald-700">{course.grade.name}</p><h3 className="mt-1 truncate text-lg font-black">{course.title}</h3></div><strong className="rounded-lg bg-emerald-50 px-2 py-1 text-xs text-emerald-800">{percent}%</strong></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-emerald-600" style={{ width: `${percent}%` }}/></div><p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-600">{course.units.length} unit · {course.description}</p>{nextUnit ? <Link href={`/learn/${course.grade.slug}/${nextUnit.slug}`} className="mt-3 inline-flex min-h-10 items-center justify-center self-start rounded-xl bg-emerald-700 px-4 text-sm font-black text-white hover:bg-emerald-800">{percent ? "Học tiếp" : "Bắt đầu"} →</Link> : <span className="mt-3 inline-flex min-h-10 items-center self-start rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-500">Sắp có</span>}</article>;
        })}</div>
      </section>

      {recent.length > 0 && <section className="mt-7"><h2 className="text-lg font-black">Hoạt động gần đây</h2><div className="mt-3 space-y-2">{recent.map((item) => <Link key={item.id} href={`/learn/${item.lesson.unit.course.grade.slug}/${item.lesson.unit.slug}`} className="flex min-h-12 items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-slate-900/5 hover:bg-emerald-50"><span className="min-w-0 truncate"><strong>{item.lesson.title}</strong> · {item.percent}% · {item.lesson.unit.title}</span><strong className="shrink-0 text-xs text-emerald-700">Học tiếp →</strong></Link>)}</div></section>}
    </div>
  </main>;
}

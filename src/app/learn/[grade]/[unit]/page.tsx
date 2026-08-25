import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getPublishedUnit } from "@/lib/curriculum";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import LessonPlayer from "./lesson-player";
import UnitAiChat from "./unit-ai-chat";
import UnitNavigator from "./unit-navigator";

export const dynamic = "force-dynamic";
export default async function UnitPage({ params }: { params: Promise<{ grade: string; unit: string }> }) {
  const session = await auth(); if (!session?.user?.id) redirect("/login");
  const { grade, unit } = await params; const data = await getPublishedUnit(grade, unit); if (!data) notFound();
  const learner = await getActiveLearner();
  const unitActivities = data.lessons.flatMap((lesson) => lesson.activities);
  const latestActivityEvent = await prisma.productEvent.findFirst({
    where: { learnerProfileId: learner.id, name: "activity_completed", entityId: { in: unitActivities.map((activity) => activity.id) } },
    select: { entityId: true, metadata: true },
    orderBy: { createdAt: "desc" },
  });
  const latestIndex = latestActivityEvent?.entityId ? unitActivities.findIndex((activity) => activity.id === latestActivityEvent.entityId) : -1;
  const latestActivity = latestIndex >= 0 ? unitActivities[latestIndex] : null;
  const eventMetadata = typeof latestActivityEvent?.metadata === "object" && latestActivityEvent.metadata !== null ? latestActivityEvent.metadata as Record<string, unknown> : {};
  const shouldAdvance = eventMetadata.passed === true || latestActivity?.type === "FLASHCARD";
  const initialActivityIndex = latestIndex < 0 ? 0 : Math.min(latestIndex + (shouldAdvance ? 1 : 0), Math.max(unitActivities.length - 1, 0));
  const serialized = JSON.parse(JSON.stringify(data.lessons));
  const currentUnitIndex = data.course.units.findIndex((item) => item.id === data.id);
  const nextUnit = data.course.units[currentUnitIndex + 1];
  const completionHref = nextUnit ? `/learn/${data.course.grade.slug}/${nextUnit.slug}` : "/dashboard";
  const completionLabel = nextUnit ? `Học Unit ${nextUnit.order}: ${nextUnit.title} →` : "Hoàn thành lộ trình →";
  const starters = data.lessons.flatMap((lesson) => lesson.activities).flatMap((activity) => {
    const payload = typeof activity.payload === "object" && activity.payload !== null ? activity.payload as Record<string, unknown> : {};
    const phrase = typeof payload.target === "string" ? payload.target : typeof payload.front === "string" ? payload.front : "";
    return phrase ? [phrase] : [];
  }).filter((phrase, index, phrases) => phrases.indexOf(phrase) === index).slice(0, 3);
  const scenarios = data.lessons.flatMap((lesson) => lesson.activities).flatMap((activity) => {
    const payload = typeof activity.payload === "object" && activity.payload !== null && !Array.isArray(activity.payload) ? activity.payload as Record<string, unknown> : {};
    return typeof payload.scenario === "string" && payload.scenario.trim()
      ? [{ activityId: activity.id, title: activity.title, description: payload.scenario.trim() }]
      : [];
  }).filter((scenario, index, items) => items.findIndex((item) => item.description === scenario.description) === index).slice(0, 3);
  const groqConfigured = Boolean(process.env.GROQ_API_KEY || process.env.GROQ_API_KEYS);
  return <main className="min-h-screen bg-[#f5f8f5] text-[#163129]"><header className="border-b bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5"><Link href="/dashboard" className="font-black">← Bảng học</Link><Link href="/review" className="text-sm font-bold">Ôn tập</Link></div></header><div className="mx-auto max-w-6xl px-4 py-3"><section className="grid overflow-hidden rounded-2xl bg-emerald-900 text-white md:grid-cols-[1fr_220px]"><div className="p-4"><p className="text-[11px] font-black uppercase tracking-wider text-emerald-300">{data.course.grade.name} · Unit {data.order} · {data.theme}</p><div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1"><h1 className="text-2xl font-black">{data.title}</h1><p className="text-xs font-bold">{data.lessons.length} lesson · khoảng {data.lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)} phút</p></div><p className="mt-1.5 max-w-2xl text-sm leading-5 text-emerald-50/80">{data.description}</p></div><div className="relative hidden min-h-28 md:block">{data.imageUrl && <Image src={data.imageUrl} alt={`Hình minh họa ${data.theme}`} fill sizes="220px" className="object-cover" priority/>}</div></section>
    <UnitNavigator gradeName={data.course.grade.name} gradeSlug={data.course.grade.slug} units={data.course.units.map(({ id, slug, order, title, theme }) => ({ id, slug, order, title, theme }))} currentUnitId={data.id}/>
    <LessonPlayer lessons={serialized} completionHref={completionHref} completionLabel={completionLabel} initialActivityIndex={initialActivityIndex} hasSavedProgress={latestIndex >= 0} voiceConfigured={groqConfigured}/>
    <UnitAiChat unitId={data.id} unitTitle={data.title} unitTheme={data.theme} starters={starters} scenarios={scenarios} configured={Boolean(groqConfigured || process.env.NVIDIA_API_KEY || process.env.OPENAI_API_KEY)} voiceConfigured={groqConfigured}/>
  </div></main>;
}

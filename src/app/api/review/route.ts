import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreActivity, validateActivityAnswer } from "@/lib/activities";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import { refreshLessonProgress, scheduleAfterReview } from "@/lib/progress";

export async function GET() {
  const learner = await getActiveLearner();
  const now = new Date();
  const activitySelect = { id: true, type: true, title: true, instruction: true, payload: true } as const;
  const [items, upcoming] = await Promise.all([
    prisma.reviewSchedule.findMany({
      where: { learnerProfileId: learner.id, dueAt: { lte: now } },
      include: { activity: { select: activitySelect } },
      orderBy: { dueAt: "asc" },
    }),
    prisma.reviewSchedule.findMany({
      where: { learnerProfileId: learner.id, dueAt: { gt: now } },
      include: { activity: { select: activitySelect } },
      orderBy: { dueAt: "asc" },
      take: 3,
    }),
  ]);
  await prisma.productEvent.create({ data: { learnerProfileId: learner.id, name: "review_opened" } });
  return NextResponse.json({ items, upcoming });
}

export async function PUT(request: Request) {
  const learner = await getActiveLearner();
  const parsed = z.object({ id: z.string().cuid(), answer: z.unknown() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  const item = await prisma.reviewSchedule.findFirst({ where: { id: parsed.data.id, learnerProfileId: learner.id }, include: { activity: true } });
  if (!item) return NextResponse.json({ error: "REVIEW_NOT_FOUND" }, { status: 404 });
  if (!validateActivityAnswer(item.activity.type, parsed.data.answer).success) return NextResponse.json({ error: "INVALID_ANSWER" }, { status: 400 });
  const result = scoreActivity(item.activity.type, item.activity.payload, parsed.data.answer);
  const nextSchedule = scheduleAfterReview(new Date(), result.passed, item.intervalIndex, (item.lastScore ?? 0) >= 70);
  const [, updated] = await prisma.$transaction([
    prisma.activityAttempt.create({ data: { learnerProfileId: learner.id, activityId: item.activityId, answer: parsed.data.answer as object, score: result.score, passed: result.passed } }),
    prisma.reviewSchedule.update({ where: { id: item.id }, data: { ...nextSchedule, completedCount: { increment: 1 }, lastScore: result.score } }),
  ]);
  const progress = await refreshLessonProgress(learner.id, item.activity.lessonId);
  await prisma.productEvent.create({ data: { learnerProfileId: learner.id, name: "review_completed", entityType: "Activity", entityId: item.activityId, metadata: { score: result.score, passed: result.passed } } });
  return NextResponse.json({ item: updated, ...result, progress, reviewDueAt: nextSchedule.dueAt });
}

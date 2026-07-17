import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreActivity, validateActivityAnswer } from "@/lib/activities";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import { addDays, REVIEW_INTERVALS } from "@/lib/progress";

export async function GET() {
  const learner = await getActiveLearner();
  const items = await prisma.reviewSchedule.findMany({
    where: { learnerProfileId: learner.id, dueAt: { lte: new Date() } },
    include: { activity: { select: { id: true, type: true, title: true, instruction: true, payload: true } } },
    orderBy: { dueAt: "asc" },
  });
  await prisma.productEvent.create({ data: { learnerProfileId: learner.id, name: "review_opened" } });
  return NextResponse.json({ items });
}

export async function PUT(request: Request) {
  const learner = await getActiveLearner();
  const parsed = z.object({ id: z.string().cuid(), answer: z.unknown() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  const item = await prisma.reviewSchedule.findFirst({ where: { id: parsed.data.id, learnerProfileId: learner.id }, include: { activity: true } });
  if (!item) return NextResponse.json({ error: "REVIEW_NOT_FOUND" }, { status: 404 });
  if (!validateActivityAnswer(item.activity.type, parsed.data.answer).success) return NextResponse.json({ error: "INVALID_ANSWER" }, { status: 400 });
  const result = scoreActivity(item.activity.type, item.activity.payload, parsed.data.answer);
  const nextIndex = result.passed ? Math.min(item.intervalIndex + 1, REVIEW_INTERVALS.length - 1) : 0;
  const updated = await prisma.reviewSchedule.update({ where: { id: item.id }, data: { intervalIndex: nextIndex, completedCount: { increment: 1 }, lastScore: result.score, dueAt: addDays(new Date(), REVIEW_INTERVALS[nextIndex]) } });
  await prisma.productEvent.create({ data: { learnerProfileId: learner.id, name: "review_completed", entityType: "Activity", entityId: item.activityId, metadata: { score: result.score, passed: result.passed } } });
  return NextResponse.json({ item: updated, ...result });
}

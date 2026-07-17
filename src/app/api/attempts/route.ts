import { ContentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreActivity, validateActivityAnswer } from "@/lib/activities";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import { addDays, refreshLessonProgress } from "@/lib/progress";

const attemptSchema = z.object({ activityId: z.string().cuid(), answer: z.unknown(), durationSeconds: z.number().int().min(0).max(3600).default(0) });

export async function POST(request: Request) {
  const learner = await getActiveLearner();
  const parsed = attemptSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  const activity = await prisma.activity.findFirst({
    where: { id: parsed.data.activityId, status: ContentStatus.PUBLISHED, lesson: { status: ContentStatus.PUBLISHED, unit: { status: ContentStatus.PUBLISHED, course: { status: ContentStatus.PUBLISHED } } } },
    include: { lesson: { select: { id: true } } },
  });
  if (!activity) return NextResponse.json({ error: "ACTIVITY_NOT_FOUND" }, { status: 404 });
  if (!validateActivityAnswer(activity.type, parsed.data.answer).success) return NextResponse.json({ error: "INVALID_ANSWER" }, { status: 400 });

  const result = scoreActivity(activity.type, activity.payload, parsed.data.answer);
  const attempt = await prisma.activityAttempt.create({ data: { learnerProfileId: learner.id, activityId: activity.id, answer: parsed.data.answer as object, score: result.score, passed: result.passed, durationSeconds: parsed.data.durationSeconds } });
  const progress = await refreshLessonProgress(learner.id, activity.lesson.id);

  if (result.passed) {
    await prisma.reviewSchedule.upsert({
      where: { learnerProfileId_activityId: { learnerProfileId: learner.id, activityId: activity.id } },
      create: { learnerProfileId: learner.id, activityId: activity.id, dueAt: addDays(new Date(), 1), lastScore: result.score },
      update: { dueAt: addDays(new Date(), 1), intervalIndex: 0, lastScore: result.score },
    });
  }
  await prisma.productEvent.create({ data: { learnerProfileId: learner.id, name: "activity_completed", entityType: "Activity", entityId: activity.id, metadata: { score: result.score, passed: result.passed } } });
  if (progress?.completedAt) await prisma.productEvent.create({ data: { learnerProfileId: learner.id, name: "lesson_completed", entityType: "Lesson", entityId: activity.lesson.id } });
  return NextResponse.json({ attemptId: attempt.id, ...result, progress });
}

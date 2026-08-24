import { prisma } from "@/lib/prisma";

export const REVIEW_INTERVALS = [1, 3, 7, 14] as const;
export const FORGOTTEN_RETRY_MINUTES = 10;

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

export function scheduleAfterAttempt(now: Date, passed: boolean) {
  return {
    intervalIndex: 0,
    dueAt: passed ? addDays(now, REVIEW_INTERVALS[0]) : addMinutes(now, FORGOTTEN_RETRY_MINUTES),
  };
}

export function scheduleAfterReview(now: Date, passed: boolean, currentIndex: number) {
  if (!passed) return { intervalIndex: 0, dueAt: addMinutes(now, FORGOTTEN_RETRY_MINUTES) };
  const intervalIndex = Math.min(currentIndex + 1, REVIEW_INTERVALS.length - 1);
  return { intervalIndex, dueAt: addDays(now, REVIEW_INTERVALS[intervalIndex]) };
}

export async function refreshLessonProgress(learnerProfileId: string, lessonId: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { activities: { where: { required: true, status: "PUBLISHED" }, select: { id: true } } },
  });
  if (!lesson) return null;

  const attempts = await prisma.activityAttempt.findMany({
    where: { learnerProfileId, activityId: { in: lesson.activities.map((item) => item.id) } },
    select: { activityId: true, score: true, passed: true },
  });
  const bestByActivity = new Map<string, { score: number; passed: boolean }>();
  for (const attempt of attempts) {
    const current = bestByActivity.get(attempt.activityId);
    if (!current || attempt.score > current.score) bestByActivity.set(attempt.activityId, { score: attempt.score, passed: attempt.passed });
  }
  const requiredCount = lesson.activities.length;
  const passedCount = lesson.activities.filter((item) => bestByActivity.get(item.id)?.passed).length;
  const percent = requiredCount ? Math.round((passedCount / requiredCount) * 100) : 0;
  const bestScore = requiredCount ? Math.round(lesson.activities.reduce((sum, item) => sum + (bestByActivity.get(item.id)?.score || 0), 0) / requiredCount) : 0;
  const completed = requiredCount > 0 && passedCount === requiredCount && bestScore >= 70;

  return prisma.lessonProgress.upsert({
    where: { learnerProfileId_lessonId: { learnerProfileId, lessonId } },
    create: { learnerProfileId, lessonId, percent, bestScore, completedAt: completed ? new Date() : null },
    update: { percent, bestScore, completedAt: completed ? new Date() : null, lastActivityAt: new Date() },
  });
}

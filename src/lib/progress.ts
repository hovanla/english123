import { prisma } from "@/lib/prisma";

export const REVIEW_INTERVALS = [1, 3, 7, 14] as const;

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
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

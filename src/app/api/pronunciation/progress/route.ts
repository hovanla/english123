import { NextResponse } from "next/server";
import { z } from "zod";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import { pronunciationLessonIds } from "@/lib/pronunciation-course";

const schema = z.object({ lessonId: z.string().refine((id) => pronunciationLessonIds.includes(id)) });
export async function POST(request: Request) {
  const learner = await getActiveLearner();
  const input = schema.safeParse(await request.json().catch(() => null));
  if (!input.success) return NextResponse.json({ error: "INVALID_LESSON" }, { status: 400 });
  const where = { learnerProfileId: learner.id, name: "pronunciation_practiced", entityType: "PronunciationLesson", entityId: input.data.lessonId };
  const existing = await prisma.productEvent.findFirst({ where, select: { id: true } });
  if (!existing) await prisma.productEvent.create({ data: where });
  return NextResponse.json({ ok: true });
}

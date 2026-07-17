import { ContentStatus, Prisma, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth";
import { canTransitionContent } from "@/lib/authorization";
import { prisma } from "@/lib/prisma";

const entitySchema = z.enum(["Course", "Unit", "Lesson", "Activity"]);
const transitionSchema = z.object({ entityType: entitySchema, entityId: z.string().cuid(), status: z.nativeEnum(ContentStatus) });
export async function PATCH(request: Request) {
  const user = await requireRole([Role.EDITOR, Role.ADMIN]); const parsed = transitionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  if (!canTransitionContent(user.role, parsed.data.status)) return NextResponse.json({ error: "ADMIN_REQUIRED" }, { status: 403 });
  const before = parsed.data.entityType === "Course" ? await prisma.course.findUnique({ where: { id: parsed.data.entityId } }) : parsed.data.entityType === "Unit" ? await prisma.unit.findUnique({ where: { id: parsed.data.entityId } }) : parsed.data.entityType === "Lesson" ? await prisma.lesson.findUnique({ where: { id: parsed.data.entityId } }) : await prisma.activity.findUnique({ where: { id: parsed.data.entityId } });
  if (!before) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (parsed.data.entityType === "Course") await prisma.course.update({ where: { id: parsed.data.entityId }, data: { status: parsed.data.status } });
  if (parsed.data.entityType === "Unit") await prisma.unit.update({ where: { id: parsed.data.entityId }, data: { status: parsed.data.status } });
  if (parsed.data.entityType === "Lesson") await prisma.lesson.update({ where: { id: parsed.data.entityId }, data: { status: parsed.data.status } });
  if (parsed.data.entityType === "Activity") await prisma.activity.update({ where: { id: parsed.data.entityId }, data: { status: parsed.data.status } });
  await prisma.$transaction([
    prisma.contentRevision.create({ data: { entityType: parsed.data.entityType, entityId: parsed.data.entityId, snapshot: JSON.parse(JSON.stringify(before)), note: `Chuyển trạng thái sang ${parsed.data.status}`, authorId: user.id } }),
    prisma.auditLog.create({ data: { actorId: user.id, action: "STATUS_CHANGED", entityType: parsed.data.entityType, entityId: parsed.data.entityId, metadata: { from: before.status, to: parsed.data.status } } }),
  ]);
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const user = await requireRole([Role.EDITOR, Role.ADMIN]); const parsed = z.object({ unitId: z.string().cuid() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  const source = await prisma.unit.findUnique({ where: { id: parsed.data.unitId }, include: { lessons: { include: { activities: true } } } });
  if (!source) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const suffix = Date.now().toString(36);
  const copy = await prisma.unit.create({ data: { courseId: source.courseId, slug: `${source.slug}-copy-${suffix}`, title: `${source.title} (Bản sao)`, theme: source.theme, description: source.description, imageUrl: source.imageUrl, order: source.order + 1, status: "DRAFT", lessons: { create: source.lessons.map((lesson) => ({ slug: `${lesson.slug}-${suffix}`, title: lesson.title, description: lesson.description, order: lesson.order, estimatedMinutes: lesson.estimatedMinutes, status: "DRAFT", activities: { create: lesson.activities.map((activity) => ({ type: activity.type, title: activity.title, instruction: activity.instruction, payload: JSON.parse(JSON.stringify(activity.payload)) as Prisma.InputJsonValue, order: activity.order, required: activity.required, status: "DRAFT" })) } })) } } });
  await prisma.auditLog.create({ data: { actorId: user.id, action: "UNIT_DUPLICATED", entityType: "Unit", entityId: copy.id, metadata: { sourceId: source.id } } });
  return NextResponse.json({ unit: copy }, { status: 201 });
}

import { ActivityType, Prisma, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateActivityPayload } from "@/lib/activities";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const activitySchema = z.object({ lessonId: z.string().cuid(), type: z.nativeEnum(ActivityType), title: z.string().trim().min(1).max(120), instruction: z.string().trim().min(1).max(500), payload: z.unknown(), order: z.number().int().min(1), required: z.boolean().default(true) });
export async function POST(request: Request) {
  const user = await requireRole([Role.EDITOR, Role.ADMIN]); const parsed = activitySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !validateActivityPayload(parsed.success ? parsed.data.type : ActivityType.FLASHCARD, parsed.success ? parsed.data.payload : null).success) return NextResponse.json({ error: "INVALID_ACTIVITY" }, { status: 400 });
  const item = await prisma.activity.create({ data: { ...parsed.data, payload: parsed.data.payload as Prisma.InputJsonValue, status: "DRAFT" } });
  await prisma.auditLog.create({ data: { actorId: user.id, action: "CREATED", entityType: "Activity", entityId: item.id } });
  return NextResponse.json({ item }, { status: 201 });
}
export async function PUT(request: Request) {
  const user = await requireRole([Role.EDITOR, Role.ADMIN]); const parsed = activitySchema.extend({ id: z.string().cuid() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success || !validateActivityPayload(parsed.success ? parsed.data.type : ActivityType.FLASHCARD, parsed.success ? parsed.data.payload : null).success) return NextResponse.json({ error: "INVALID_ACTIVITY" }, { status: 400 });
  const { id, lessonId: _lessonId, ...data } = parsed.data; void _lessonId;
  const item = await prisma.activity.update({ where: { id }, data: { ...data, payload: data.payload as Prisma.InputJsonValue, status: "DRAFT" } });
  await prisma.auditLog.create({ data: { actorId: user.id, action: "UPDATED", entityType: "Activity", entityId: item.id } });
  return NextResponse.json({ item });
}
export async function DELETE(request: Request) {
  const user = await requireRole([Role.EDITOR, Role.ADMIN]); const parsed = z.object({ id: z.string().cuid() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  await prisma.activity.delete({ where: { id: parsed.data.id } }); await prisma.auditLog.create({ data: { actorId: user.id, action: "DELETED", entityType: "Activity", entityId: parsed.data.id } });
  return NextResponse.json({ ok: true });
}

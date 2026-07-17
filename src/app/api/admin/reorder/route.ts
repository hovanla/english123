import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const user = await requireRole([Role.EDITOR, Role.ADMIN]); const parsed = z.object({ entityType: z.enum(["Unit", "Lesson", "Activity"]), ids: z.array(z.string().cuid()).min(1).max(200) }).safeParse(await request.json().catch(() => null));
  if (!parsed.success || new Set(parsed.data.ids).size !== parsed.data.ids.length) return NextResponse.json({ error: "INVALID_ORDER" }, { status: 400 });
  const operations = parsed.data.ids.map((id, index) => parsed.data.entityType === "Unit" ? prisma.unit.update({ where: { id }, data: { order: index + 1 } }) : parsed.data.entityType === "Lesson" ? prisma.lesson.update({ where: { id }, data: { order: index + 1 } }) : prisma.activity.update({ where: { id }, data: { order: index + 1 } }));
  await prisma.$transaction(operations); await prisma.auditLog.create({ data: { actorId: user.id, action: "REORDERED", entityType: parsed.data.entityType, entityId: parsed.data.ids[0], metadata: { ids: parsed.data.ids } } });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";

const allowedEvents = ["session_started", "lesson_started"] as const;
export async function POST(request: Request) {
  const learner = await getActiveLearner();
  const parsed = z.object({ name: z.enum(allowedEvents), entityType: z.string().max(30).optional(), entityId: z.string().max(50).optional() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_EVENT" }, { status: 400 });
  await prisma.productEvent.create({ data: { learnerProfileId: learner.id, ...parsed.data } });
  return NextResponse.json({ ok: true }, { status: 201 });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { ACTIVE_LEARNER_COOKIE } from "@/lib/learner";

export async function POST(request: Request) {
  const user = await requireUser();
  const parsed = z.object({ profileId: z.string().cuid() }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  const profile = await prisma.learnerProfile.findFirst({ where: { id: parsed.data.profileId, userId: user.id, active: true }, select: { id: true } });
  if (!profile) return NextResponse.json({ error: "PROFILE_NOT_FOUND" }, { status: 404 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACTIVE_LEARNER_COOKIE, profile.id, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 365 * 24 * 60 * 60 });
  return response;
}

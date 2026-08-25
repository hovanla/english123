import { createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { MIN_PASSWORD_LENGTH } from "@/lib/login-identifier";

export async function POST(request: Request) {
  const parsed = z.object({ token: z.string().length(64), password: z.string().min(MIN_PASSWORD_LENGTH).max(128) }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  const tokenHash = createHash("sha256").update(parsed.data.token).digest("hex");
  const reset = await prisma.passwordResetToken.findFirst({ where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } } });
  if (!reset) return NextResponse.json({ error: "TOKEN_INVALID_OR_EXPIRED" }, { status: 400 });
  await prisma.$transaction([prisma.user.update({ where: { id: reset.userId }, data: { passwordHash: await bcrypt.hash(parsed.data.password, 12), sessionVersion: { increment: 1 } } }), prisma.passwordResetToken.update({ where: { id: reset.id }, data: { usedAt: new Date() } }), prisma.session.deleteMany({ where: { userId: reset.userId } })]);
  return NextResponse.json({ ok: true });
}

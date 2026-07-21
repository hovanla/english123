import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const parsed = z.object({ email: z.string().email().transform((value) => value.toLowerCase().trim()) }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: true });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true, email: true } });
  let developmentResetUrl: string | undefined;
  if (user) {
    const token = randomBytes(32).toString("hex"); const tokenHash = createHash("sha256").update(token).digest("hex");
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } });
    await prisma.passwordResetToken.create({ data: { userId: user.id, tokenHash, expiresAt: new Date(Date.now() + 30 * 60 * 1000) } });
    const origin = process.env.AUTH_URL || process.env.NEXTAUTH_URL || new URL(request.url).origin; const resetUrl = `${origin}/reset-password?token=${token}`;
    if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
      await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.EMAIL_FROM, to: user.email, subject: "Đặt lại mật khẩu English123", html: `<p>Liên kết này có hiệu lực trong 30 phút:</p><p><a href="${resetUrl}">Đặt lại mật khẩu</a></p>` }) });
    } else if (process.env.NODE_ENV !== "production") developmentResetUrl = resetUrl;
  }
  return NextResponse.json({ ok: true, developmentResetUrl });
}

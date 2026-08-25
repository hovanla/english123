import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { displayNameFromLogin, loginIdentifierInputSchema, MIN_PASSWORD_LENGTH, normalizeLoginIdentifier } from "@/lib/login-identifier";

const registerSchema = z.object({
  login: loginIdentifierInputSchema,
  password: z.string().min(MIN_PASSWORD_LENGTH).max(128),
  parentalConsent: z.literal(true),
});

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT", fields: parsed.error.flatten().fieldErrors }, { status: 400 });

  const normalizedLogin = normalizeLoginIdentifier(parsed.data.login);
  const existing = await prisma.user.findUnique({ where: { email: normalizedLogin }, select: { id: true } });
  if (existing) return NextResponse.json({ error: "LOGIN_EXISTS" }, { status: 409 });

  const user = await prisma.user.create({
    data: {
      email: normalizedLogin,
      passwordHash: await bcrypt.hash(parsed.data.password, 12),
      learnerProfiles: {
        create: {
          displayName: displayNameFromLogin(parsed.data.login),
          parentalConsent: new Date(),
        },
      },
    },
  });
  return NextResponse.json({ userId: user.id }, { status: 201 });
}

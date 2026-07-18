import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  password: z.string().min(8).max(128),
  learnerName: z.string().trim().min(1).max(50),
  parentalConsent: z.literal(true),
});

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT", fields: parsed.error.flatten().fieldErrors }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email }, select: { id: true } });
  if (existing) return NextResponse.json({ error: "EMAIL_EXISTS" }, { status: 409 });

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash: await bcrypt.hash(parsed.data.password, 12),
      learnerProfiles: {
        create: {
          displayName: parsed.data.learnerName,
          parentalConsent: new Date(),
        },
      },
    },
  });
  return NextResponse.json({ userId: user.id }, { status: 201 });
}

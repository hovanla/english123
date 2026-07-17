import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

const profileSchema = z.object({
  displayName: z.string().trim().min(1).max(50),
  birthYear: z.coerce.number().int().min(new Date().getFullYear() - 20).max(new Date().getFullYear() - 3),
  gradeSlug: z.string().min(1),
  parentalConsent: z.literal(true),
});

export async function GET() {
  const user = await requireUser();
  const profiles = await prisma.learnerProfile.findMany({ where: { userId: user.id, active: true }, include: { grade: true }, orderBy: { createdAt: "asc" } });
  return NextResponse.json({ profiles });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const parsed = profileSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  const grade = await prisma.grade.findUnique({ where: { slug: parsed.data.gradeSlug }, select: { id: true } });
  if (!grade) return NextResponse.json({ error: "GRADE_NOT_FOUND" }, { status: 400 });
  const profile = await prisma.learnerProfile.create({ data: { userId: user.id, displayName: parsed.data.displayName, birthYear: parsed.data.birthYear, gradeId: grade.id, parentalConsent: new Date() } });
  return NextResponse.json({ profile }, { status: 201 });
}

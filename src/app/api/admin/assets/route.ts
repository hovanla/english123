import { put } from "@vercel/blob";
import { AssetLicense, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const user = await requireRole([Role.EDITOR, Role.ADMIN]); const form = await request.formData(); const file = form.get("file");
  const parsed = z.object({ altText: z.string().min(1).max(200), source: z.string().min(1).max(300), license: z.nativeEnum(AssetLicense) }).safeParse({ altText: form.get("altText"), source: form.get("source"), license: form.get("license") });
  if (!(file instanceof File) || !parsed.success || file.size > 10 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp", "audio/mpeg", "audio/wav"].includes(file.type)) return NextResponse.json({ error: "INVALID_ASSET" }, { status: 400 });
  const blob = await put(`english123/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`, file, { access: "public", addRandomSuffix: false });
  const asset = await prisma.asset.create({ data: { url: blob.url, pathname: blob.pathname, contentType: file.type, ...parsed.data } });
  await prisma.auditLog.create({ data: { actorId: user.id, action: "ASSET_UPLOADED", entityType: "Asset", entityId: asset.id } });
  return NextResponse.json({ asset }, { status: 201 });
}

import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

export function mobileTokenHash(token: string) {
  return `mobile:${createHash("sha256").update(token).digest("hex")}`;
}

export async function createMobileSession(userId: string, sessionVersion: number) {
  const token = `m1.${sessionVersion}.${randomBytes(32).toString("hex")}`;
  const expires = new Date(Date.now() + 30 * 86400_000);
  await prisma.session.create({ data: { userId, sessionToken: mobileTokenHash(token), expires } });
  return { token, expires };
}

export async function readMobileUser(authorization: string) {
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!/^m1\.\d+\.[a-f0-9]{64}$/.test(token)) throw new Response("Phiên đăng nhập không hợp lệ.", { status: 401 });
  const session = await prisma.session.findUnique({ where: { sessionToken: mobileTokenHash(token) }, include: { user: true } });
  if (!session || session.expires <= new Date() || session.user.sessionVersion !== Number(token.split(".")[1])) {
    throw new Response("Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại.", { status: 401 });
  }
  const { id, email, name, role } = session.user;
  return { id, email, name, role };
}

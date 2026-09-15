import { Role } from "@prisma/client";
import { auth } from "../../auth";
import { headers } from "next/headers";
import { readMobileUser } from "@/lib/mobile-session";

export async function requireUser() {
  const authorization = (await headers()).get("authorization");
  if (authorization) return readMobileUser(authorization);
  const session = await auth();
  if (!session?.user?.id) throw new Response("Bạn cần đăng nhập.", { status: 401 });
  return session.user;
}

export async function requireRole(roles: Role[]) {
  const user = await requireUser();
  if (!roles.includes(user.role)) throw new Response("Bạn không có quyền thực hiện thao tác này.", { status: 403 });
  return user;
}

export async function isContentStaff() {
  const session = await auth();
  return Boolean(session?.user && (session.user.role === Role.EDITOR || session.user.role === Role.ADMIN));
}

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export const ACTIVE_LEARNER_COOKIE = "english123_learner";

export async function getActiveLearner() {
  const user = await requireUser();
  const cookieStore = await cookies();
  const requestedId = cookieStore.get(ACTIVE_LEARNER_COOKIE)?.value;
  const learner = await prisma.learnerProfile.findFirst({
    where: { userId: user.id, active: true, ...(requestedId ? { id: requestedId } : {}) },
    include: { grade: true },
    orderBy: { createdAt: "asc" },
  });
  if (!learner) throw new Response("Hãy tạo hồ sơ học sinh trước.", { status: 409 });
  return learner;
}

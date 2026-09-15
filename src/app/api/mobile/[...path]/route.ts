import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { getActiveLearner } from "@/lib/learner";
import { createMobileSession, mobileTokenHash, readMobileUser } from "@/lib/mobile-session";
import { loginIdentifierSchema, MIN_PASSWORD_LENGTH } from "@/lib/login-identifier";
import { getPublishedGrades } from "@/lib/curriculum";
import { getVocabularyDefinition } from "@/lib/vocabulary-dictionary";
import { POST as attempt } from "@/app/api/attempts/route";
import { POST as chat } from "@/app/api/ai/unit-chat/route";
import { POST as transcribe } from "@/app/api/ai/speech-to-text/route";
import { POST as pronunciation } from "@/app/api/ai/pronunciation/route";
import { GET as reviews, PUT as completeReview } from "@/app/api/review/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
const loginSchema = z.object({ login: loginIdentifierSchema, password: z.string().min(MIN_PASSWORD_LENGTH).max(128) });
const published = { status: "PUBLISHED" as const };

async function route(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const path = (await context.params).path.join("/");
  try {
    if (path === "login" && request.method === "POST") {
      const parsed = loginSchema.safeParse(await request.json().catch(() => null));
      if (!parsed.success) return Response.json({ error: "Nhập tên đăng nhập và mật khẩu hợp lệ." }, { status: 400 });
      const identifier = createHash("sha256").update(parsed.data.login).digest("hex");
      const since = new Date(Date.now() - 15 * 60_000);
      const count = await prisma.productEvent.count({ where: { name: "mobile_login_attempt", entityId: identifier, createdAt: { gte: since } } });
      if (count >= 10) return Response.json({ error: "Đã thử quá nhiều lần. Hãy đợi 15 phút." }, { status: 429 });
      await prisma.productEvent.create({ data: { name: "mobile_login_attempt", entityId: identifier } });
      const user = await prisma.user.findUnique({ where: { email: parsed.data.login } });
      if (!user?.passwordHash || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
        return Response.json({ error: "Tên đăng nhập hoặc mật khẩu chưa đúng." }, { status: 401 });
      }
      const session = await createMobileSession(user.id, user.sessionVersion);
      return Response.json(session);
    }
    // This gateway accepts native bearer sessions only; web cookies are not a substitute.
    await readMobileUser(request.headers.get("authorization") || "");
    if (path === "logout" && request.method === "POST") {
      await prisma.session.deleteMany({ where: { sessionToken: mobileTokenHash(request.headers.get("authorization")!.slice(7)) } });
      return Response.json({ ok: true });
    }
    if (path === "me" && request.method === "GET") {
      const user = await requireUser();
      const profiles = await prisma.learnerProfile.findMany({ where: { userId: user.id, active: true }, select: { id: true, displayName: true } });
      return Response.json({ user, profiles });
    }
    const learner = await getActiveLearner();
    if (path === "curriculum" && request.method === "GET") {
      const [grades, progress, latest, dueCount] = await Promise.all([
        getPublishedGrades(),
        prisma.lessonProgress.findMany({ where: { learnerProfileId: learner.id }, select: { lessonId: true, percent: true } }),
        prisma.activityAttempt.findFirst({ where: { learnerProfileId: learner.id }, orderBy: { createdAt: "desc" }, select: { activity: { select: { lesson: { select: { unit: { select: { id: true, title: true } } } } } } } }),
        prisma.reviewSchedule.count({ where: { learnerProfileId: learner.id, dueAt: { lte: new Date() } } }),
      ]);
      return Response.json({ grades, progress, latestUnit: latest?.activity.lesson.unit || null, dueCount });
    }
    if (path.startsWith("units/") && request.method === "GET") {
      const id = path.slice(6);
      const unit = await prisma.unit.findFirst({ where: { id, ...published, course: published }, include: { lessons: { where: published, orderBy: { order: "asc" }, include: { activities: { where: published, orderBy: { order: "asc" } } } } } });
      if (!unit) return Response.json({ error: "Không tìm thấy Unit." }, { status: 404 });
      const ids = unit.lessons.flatMap((lesson) => lesson.activities.map((activity) => activity.id));
      const [attempts, progress] = await Promise.all([
        prisma.activityAttempt.findMany({ where: { learnerProfileId: learner.id, activityId: { in: ids } }, orderBy: { createdAt: "desc" }, select: { activityId: true, passed: true } }),
        prisma.lessonProgress.findMany({ where: { learnerProfileId: learner.id, lessonId: { in: unit.lessons.map((lesson) => lesson.id) } }, select: { lessonId: true, percent: true } }),
      ]);
      for (const lesson of unit.lessons) for (const activity of lesson.activities) {
        if (activity.type !== "FLASHCARD" || !activity.payload || typeof activity.payload !== "object" || Array.isArray(activity.payload)) continue;
        const payload = activity.payload;
        if (!payload.definition) payload.definition = getVocabularyDefinition(String(payload.front || ""), String(payload.back || ""));
      }
      return Response.json({ unit, progress, attemptedIds: [...new Set(attempts.map((item) => item.activityId))], latestActivityId: attempts[0]?.activityId || null });
    }
    if (path === "attempts" && request.method === "POST") return await attempt(request);
    if (path === "chat" && request.method === "POST") return await chat(request);
    if (path === "transcribe" && request.method === "POST") return await transcribe(request);
    if (path === "pronunciation" && request.method === "POST") return await pronunciation(request);
    if (path === "reviews" && request.method === "GET") return await reviews();
    if (path === "reviews" && request.method === "PUT") return await completeReview(request);
    return Response.json({ error: "NOT_FOUND" }, { status: 404 });
  } catch (error) {
    if (error instanceof Response) return Response.json({ error: await error.text() }, { status: error.status });
    return Response.json({ error: "Máy chủ đang bận. Hãy thử lại." }, { status: 500 });
  }
}

async function handle(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const response = await route(request, context);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
export { handle as GET, handle as POST, handle as PUT };

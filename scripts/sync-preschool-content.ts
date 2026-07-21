import { AssetLicense, ContentStatus, Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { buildPreschoolLessons, getPreschoolScene, preschoolImageUrl } from "../src/lib/preschool-content";

const letterSets = [
  ["A"], ["B"], ["C"], ["D"], ["E"], ["F"], ["G"], ["H"], ["I"], ["J"], ["K"], ["L"], ["M"], ["N"],
  ["O", "P"], ["Q", "R"], ["S", "T"], ["U", "V"], ["W", "X"], ["Y", "Z"],
];

const lessonAliases: Record<string, string> = {
  "phan-xa-doi-thuc": "sentences-games",
  "nhin-nghe-doan-tu": "words",
  "chu-cai-chu-so": "chu-cai-chu-so",
};

function payloadObject(value: Prisma.JsonValue) {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

async function main() {
  const course = await prisma.course.findFirst({
    where: { grade: { slug: "mam-non" } },
    include: { units: { orderBy: { order: "asc" }, include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } } },
  });
  if (!course) throw new Error("Không tìm thấy khóa Tiếng Anh Mầm non. Hãy chạy local:setup trước.");

  await prisma.course.update({
    where: { id: course.id },
    data: { description: "20 unit phản xạ tự nhiên cho trẻ 3–6 tuổi: gặp tình huống, nhìn hình đoán từ, nghe hiểu và nói lại." },
  });

  let activityCount = 0;
  for (const unit of course.units) {
    const existingWordLesson = unit.lessons.find((lesson) => ["words", "nhin-nghe-doan-tu"].includes(lesson.slug));
    const flashcardPayloads = existingWordLesson?.activities
      .filter((activity) => activity.type === "FLASHCARD")
      .map((activity) => payloadObject(activity.payload))
      .filter((payload) => typeof payload.front === "string" && typeof payload.back === "string") || [];
    const visualOnly = flashcardPayloads.filter((payload) => payload.mode === "VISUAL_GUESS");
    const visualCards = (visualOnly.length >= 4 ? visualOnly : flashcardPayloads).slice(0, 4);
    if (visualCards.length !== 4) throw new Error(`Không đọc được 4 từ vựng của unit ${unit.slug}`);

    const words = visualCards.map((payload) => [String(payload.front), String(payload.back)] as [string, string]);
    if (unit.slug === "hello") words[2] = ["goodbye", "tạm biệt"];
    const lessons = buildPreschoolLessons({
      slug: unit.slug,
      theme: unit.theme,
      words,
      letters: letterSets[unit.order - 1],
      number: unit.order % 2 === 1 ? (unit.order + 1) / 2 : undefined,
    });
    const scene = getPreschoolScene(unit.slug);

    await prisma.unit.update({
      where: { id: unit.id },
      data: {
        imageUrl: preschoolImageUrl(unit.slug),
        description: `${unit.description.replace(/\s*Học theo phản xạ.*$/u, "")} Học theo phản xạ qua tình huống, hình ảnh và âm thanh.`,
      },
    });

    await prisma.asset.upsert({
      where: { url: preschoolImageUrl(unit.slug) },
      create: {
        url: preschoolImageUrl(unit.slug), pathname: `preschool/scenes/${unit.slug}.webp`, contentType: "image/webp",
        altText: scene?.imageAlt || `Minh họa ${unit.theme}`, source: "English123 · OpenAI image generation", license: AssetLicense.OWNED, width: 256, height: 307,
      },
      update: { altText: scene?.imageAlt || `Minh họa ${unit.theme}`, source: "English123 · OpenAI image generation", license: AssetLicense.OWNED, width: 256, height: 307 },
    });

    for (const [lessonIndex, lessonSeed] of lessons.entries()) {
      const alias = lessonAliases[lessonSeed.slug];
      let lesson = unit.lessons.find((item) => item.slug === lessonSeed.slug) || unit.lessons.find((item) => item.slug === alias);
      const alreadySynced = lesson?.slug === lessonSeed.slug;

      if (!lesson) {
        lesson = await prisma.lesson.create({
          data: { unitId: unit.id, slug: lessonSeed.slug, title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: 7, status: ContentStatus.PUBLISHED },
          include: { activities: true },
        });
      } else {
        lesson = await prisma.lesson.update({
          where: { id: lesson.id },
          data: { slug: lessonSeed.slug, title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: 7, status: ContentStatus.PUBLISHED },
          include: { activities: true },
        });
      }

      if (!alreadySynced) await prisma.activity.updateMany({ where: { lessonId: lesson.id }, data: { status: ContentStatus.DRAFT } });
      const publishedExisting = alreadySynced ? lesson.activities.filter((activity) => activity.status === ContentStatus.PUBLISHED) : [];

      for (const activitySeed of lessonSeed.activities) {
        const existing = publishedExisting.find((activity) => activity.order === activitySeed.order);
        const data = { ...activitySeed, payload: activitySeed.payload as Prisma.InputJsonValue, required: true, status: ContentStatus.PUBLISHED };
        if (existing) await prisma.activity.update({ where: { id: existing.id }, data });
        else await prisma.activity.create({ data: { lessonId: lesson.id, ...data } });
        activityCount += 1;
      }
      await prisma.activity.updateMany({
        where: { lessonId: lesson.id, order: { gt: lessonSeed.activities.length } },
        data: { status: ContentStatus.DRAFT },
      });
    }
  }

  console.log(`Đã đồng bộ ${course.units.length} unit Mầm non với ${activityCount} hoạt động phản xạ.`);
}

main().finally(() => prisma.$disconnect());

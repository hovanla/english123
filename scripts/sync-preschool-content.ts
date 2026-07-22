import { AssetLicense, ContentStatus, Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { buildPreschoolLessons, getPreschoolScene, preschoolImageUrl } from "../src/lib/preschool-content";

const lessonAliases: Record<string, string[]> = {
  "tu-vung": ["nhin-nghe-doan-tu", "words"],
  "mau-cau": ["phan-xa-doi-thuc", "sentences-games"],
};

async function main() {
  const course = await prisma.course.findFirst({
    where: { grade: { slug: "mam-non" } },
    include: { units: { orderBy: { order: "asc" }, include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } } },
  });
  if (!course) throw new Error("Không tìm thấy khóa Tiếng Anh Mầm non. Hãy chạy local:setup trước.");

  await prisma.course.update({
    where: { id: course.id },
    data: { description: "20 unit từ vựng và mẫu câu phản xạ tự nhiên cho trẻ 3–6 tuổi: nhìn hình đoán từ, nghe hiểu và dùng câu trong tình huống thật." },
  });

  let activityCount = 0;
  for (const unit of course.units) {
    const lessons = buildPreschoolLessons({
      slug: unit.slug,
      theme: unit.theme,
    });
    const scene = getPreschoolScene(unit.slug);

    await prisma.unit.update({
      where: { id: unit.id },
      data: {
        imageUrl: preschoolImageUrl(unit.slug),
        description: `Học từ vựng và mẫu câu về ${unit.theme.toLowerCase()} qua hình ảnh, âm thanh và tình huống đời thực.`,
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

    const activeLessonIds: string[] = [];
    for (const [lessonIndex, lessonSeed] of lessons.entries()) {
      const aliases = lessonAliases[lessonSeed.slug] || [];
      let lesson = unit.lessons.find((item) => item.slug === lessonSeed.slug) || unit.lessons.find((item) => aliases.includes(item.slug));
      const alreadySynced = lesson?.slug === lessonSeed.slug;

      if (!lesson) {
        lesson = await prisma.lesson.create({
          data: { unitId: unit.id, slug: lessonSeed.slug, title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: lessonIndex === 0 ? 9 : 7, status: ContentStatus.PUBLISHED },
          include: { activities: true },
        });
      } else {
        lesson = await prisma.lesson.update({
          where: { id: lesson.id },
          data: { slug: lessonSeed.slug, title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: lessonIndex === 0 ? 9 : 7, status: ContentStatus.PUBLISHED },
          include: { activities: true },
        });
      }
      activeLessonIds.push(lesson.id);

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

    for (const oldLesson of unit.lessons.filter((lesson) => !activeLessonIds.includes(lesson.id))) {
      await prisma.activity.updateMany({ where: { lessonId: oldLesson.id }, data: { status: ContentStatus.DRAFT } });
      await prisma.lesson.update({ where: { id: oldLesson.id }, data: { status: ContentStatus.DRAFT } });
    }
  }

  console.log(`Đã đồng bộ ${course.units.length} unit Mầm non với ${activityCount} hoạt động phản xạ.`);
}

main().finally(() => prisma.$disconnect());

import { AssetLicense, ContentStatus, Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { buildGradeTwoLessons, gradeTwoBoardUrl, gradeTwoUnits } from "../src/lib/grade-two-content";

async function main() {
  const course = await prisma.course.findFirst({
    where: { grade: { slug: "lop-2" } },
    include: { units: { include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } } },
  });
  if (!course) throw new Error("Không tìm thấy khóa Tiếng Anh Lớp 2. Hãy chạy local:setup trước.");

  await prisma.course.update({
    where: { id: course.id },
    data: { title: "Tiếng Anh Lớp 2", description: "20 unit Lớp 2: nhìn tranh đoán từ, nghe mẫu câu và phản xạ trong tình huống đời thực.", status: ContentStatus.PUBLISHED },
  });

  const activeUnitIds: string[] = [];
  let activityCount = 0;
  for (const [unitIndex, seed] of gradeTwoUnits.entries()) {
    let unit = course.units.find((item) => item.slug === seed.slug);
    if (!unit) {
      unit = await prisma.unit.create({
        data: { courseId: course.id, slug: seed.slug, title: seed.title, theme: seed.theme, description: seed.description, imageUrl: gradeTwoBoardUrl(seed.slug), order: unitIndex + 1, status: ContentStatus.PUBLISHED },
        include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } },
      });
    } else {
      unit = await prisma.unit.update({
        where: { id: unit.id },
        data: { title: seed.title, theme: seed.theme, description: seed.description, imageUrl: gradeTwoBoardUrl(seed.slug), order: unitIndex + 1, status: ContentStatus.PUBLISHED },
        include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } },
      });
    }
    activeUnitIds.push(unit.id);

    const boardUrl = gradeTwoBoardUrl(seed.slug);
    await prisma.asset.upsert({
      where: { url: boardUrl },
      create: { url: boardUrl, pathname: boardUrl.replace(/^\//, ""), contentType: "image/webp", altText: `Bộ tranh Lớp 2 chủ đề ${seed.theme}`, source: "English123 · OpenAI image generation", license: AssetLicense.OWNED, width: 1536, height: 1024 },
      update: { pathname: boardUrl.replace(/^\//, ""), altText: `Bộ tranh Lớp 2 chủ đề ${seed.theme}`, source: "English123 · OpenAI image generation", license: AssetLicense.OWNED, width: 1536, height: 1024 },
    });

    const lessonSeeds = buildGradeTwoLessons(seed);
    const activeLessonIds: string[] = [];
    for (const [lessonIndex, lessonSeed] of lessonSeeds.entries()) {
      let lesson = unit.lessons.find((item) => item.slug === lessonSeed.slug);
      if (!lesson) {
        lesson = await prisma.lesson.create({
          data: { unitId: unit.id, slug: lessonSeed.slug, title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: lessonSeed.slug === "tu-vung" ? 7 : 5, status: ContentStatus.PUBLISHED },
          include: { activities: true },
        });
      } else {
        lesson = await prisma.lesson.update({
          where: { id: lesson.id },
          data: { title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: lessonSeed.slug === "tu-vung" ? 7 : 5, status: ContentStatus.PUBLISHED },
          include: { activities: true },
        });
      }
      activeLessonIds.push(lesson.id);
      const published = lesson.activities.filter((activity) => activity.status === ContentStatus.PUBLISHED);
      for (const activitySeed of lessonSeed.activities) {
        const existing = published.find((activity) => activity.order === activitySeed.order);
        const data = { ...activitySeed, payload: activitySeed.payload as Prisma.InputJsonValue, required: true, status: ContentStatus.PUBLISHED };
        if (existing) await prisma.activity.update({ where: { id: existing.id }, data });
        else await prisma.activity.create({ data: { lessonId: lesson.id, ...data } });
        activityCount += 1;
      }
      await prisma.activity.updateMany({ where: { lessonId: lesson.id, order: { gt: lessonSeed.activities.length } }, data: { status: ContentStatus.DRAFT } });
    }

    for (const oldLesson of unit.lessons.filter((item) => !activeLessonIds.includes(item.id))) {
      await prisma.activity.updateMany({ where: { lessonId: oldLesson.id }, data: { status: ContentStatus.DRAFT } });
      await prisma.lesson.update({ where: { id: oldLesson.id }, data: { status: ContentStatus.DRAFT } });
    }
  }

  for (const oldUnit of course.units.filter((item) => !activeUnitIds.includes(item.id))) {
    await prisma.activity.updateMany({ where: { lesson: { unitId: oldUnit.id } }, data: { status: ContentStatus.DRAFT } });
    await prisma.lesson.updateMany({ where: { unitId: oldUnit.id }, data: { status: ContentStatus.DRAFT } });
    await prisma.unit.update({ where: { id: oldUnit.id }, data: { status: ContentStatus.DRAFT } });
  }

  console.log(`Đã đồng bộ ${gradeTwoUnits.length} unit Lớp 2 với ${activityCount} hoạt động.`);
}

main().finally(() => prisma.$disconnect());

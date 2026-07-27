import { AssetLicense, ContentStatus, Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { buildGradeNineLessons, gradeNineBoardUrl, gradeNineUnits } from "../src/lib/grade-nine-content";

async function main() {
  const grade = await prisma.grade.findUnique({ where: { slug: "lop-9" } });
  if (!grade) throw new Error("Không tìm thấy cấp Lớp 9. Hãy chạy local:setup trước.");
  const baseCourse = await prisma.course.upsert({
    where: { gradeId_slug: { gradeId: grade.id, slug: "tieng-anh-lop-9" } },
    create: {
      gradeId: grade.id, slug: "tieng-anh-lop-9", title: "Tiếng Anh Lớp 9",
      description: "10 bài Lớp 9: nhìn tranh đoán từ, nghe mẫu câu và phản xạ trong tình huống đời thực.",
      order: 1, status: ContentStatus.PUBLISHED,
    },
    update: {
      title: "Tiếng Anh Lớp 9",
      description: "10 bài Lớp 9: nhìn tranh đoán từ, nghe mẫu câu và phản xạ trong tình huống đời thực.",
      status: ContentStatus.PUBLISHED,
    },
  });
  const course = await prisma.course.findUniqueOrThrow({
    where: { id: baseCourse.id },
    include: { units: { include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } } },
  });

  const activeUnitIds: string[] = [];
  let activityCount = 0;
  for (const [unitIndex, seed] of gradeNineUnits.entries()) {
    const existingUnit = course.units.find((item) => item.slug === seed.slug);
    const unitData = { title: seed.title, theme: seed.theme, description: seed.description, imageUrl: gradeNineBoardUrl(seed.slug), order: unitIndex + 1, status: ContentStatus.PUBLISHED };
    const unit = existingUnit
      ? await prisma.unit.update({ where: { id: existingUnit.id }, data: unitData, include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } })
      : await prisma.unit.create({ data: { courseId: course.id, slug: seed.slug, ...unitData }, include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } });
    activeUnitIds.push(unit.id);
    const boardUrl = gradeNineBoardUrl(seed.slug);
    await prisma.asset.upsert({
      where: { url: boardUrl },
      create: { url: boardUrl, pathname: boardUrl.replace(/^\//, ""), contentType: "image/webp", altText: `Bộ tranh Lớp 9 chủ đề ${seed.theme}`, source: "English123 · OpenAI image generation", license: AssetLicense.OWNED, width: 1250, height: 1250 },
      update: { pathname: boardUrl.replace(/^\//, ""), altText: `Bộ tranh Lớp 9 chủ đề ${seed.theme}`, source: "English123 · OpenAI image generation", license: AssetLicense.OWNED, width: 1250, height: 1250 },
    });
    const lessonSeeds = buildGradeNineLessons(seed);
    const activeLessonIds: string[] = [];
    for (const [lessonIndex, lessonSeed] of lessonSeeds.entries()) {
      const existingLesson = unit.lessons.find((item) => item.slug === lessonSeed.slug);
      const lessonData = { title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: lessonSeed.slug === "tu-vung" ? 10 : 5, status: ContentStatus.PUBLISHED };
      const lesson = existingLesson
        ? await prisma.lesson.update({ where: { id: existingLesson.id }, data: lessonData, include: { activities: true } })
        : await prisma.lesson.create({ data: { unitId: unit.id, slug: lessonSeed.slug, ...lessonData }, include: { activities: true } });
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
  console.log(`Đã đồng bộ ${gradeNineUnits.length} bài Lớp 9 với ${activityCount} hoạt động.`);
}

main().finally(() => prisma.$disconnect());

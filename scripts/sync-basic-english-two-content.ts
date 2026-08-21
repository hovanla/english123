import { AssetLicense, ContentStatus, Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import { basicEnglishTwoBoardUrl, basicEnglishTwoUnits, buildBasicEnglishTwoLessons } from "../src/lib/basic-english-two-content";

async function main() {
  const grade = await prisma.grade.upsert({ where: { slug: "tieng-anh-co-ban" }, create: { slug: "tieng-anh-co-ban", name: "Tiếng Anh cơ bản", level: "Người mới bắt đầu", description: "Từ vựng, mẫu câu và ngữ pháp nền tảng theo từng bước.", order: 14 }, update: {} });
  const baseCourse = await prisma.course.upsert({
    where: { gradeId_slug: { gradeId: grade.id, slug: "tieng-anh-co-ban-2" } },
    create: { gradeId: grade.id, slug: "tieng-anh-co-ban-2", title: "Tiếng Anh cơ bản 2", description: "12 chủ đề mở rộng, ba chặng ôn tập và phản xạ theo tình huống thực tế.", order: 2, status: ContentStatus.PUBLISHED },
    update: { title: "Tiếng Anh cơ bản 2", description: "12 chủ đề mở rộng, ba chặng ôn tập và phản xạ theo tình huống thực tế.", order: 2, status: ContentStatus.PUBLISHED },
  });
  const course = await prisma.course.findUniqueOrThrow({ where: { id: baseCourse.id }, include: { units: { include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } } } });
  const activeUnitIds: string[] = []; let activityCount = 0;

  for (const [unitIndex, seed] of basicEnglishTwoUnits.entries()) {
    const imageUrl = basicEnglishTwoBoardUrl(seed.slug); const existingUnit = course.units.find((item) => item.slug === seed.slug);
    const unitData = { title: seed.title, theme: seed.theme, description: seed.description, imageUrl, order: unitIndex + 1, status: ContentStatus.PUBLISHED };
    const unit = existingUnit ? await prisma.unit.update({ where: { id: existingUnit.id }, data: unitData, include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } }) : await prisma.unit.create({ data: { courseId: course.id, slug: seed.slug, ...unitData }, include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } } });
    activeUnitIds.push(unit.id);
    await prisma.asset.upsert({ where: { url: imageUrl }, create: { url: imageUrl, pathname: imageUrl.replace(/^\//, ""), contentType: "image/svg+xml", altText: `Bộ tranh tiếng Anh cơ bản 2 chủ đề ${seed.theme}`, source: "English123 · minh họa SVG tự biên soạn", license: AssetLicense.OWNED, width: 1500, height: 900 }, update: { pathname: imageUrl.replace(/^\//, ""), altText: `Bộ tranh tiếng Anh cơ bản 2 chủ đề ${seed.theme}`, source: "English123 · minh họa SVG tự biên soạn", license: AssetLicense.OWNED, width: 1500, height: 900 } });

    const lessonSeeds = buildBasicEnglishTwoLessons(seed); const activeLessonIds: string[] = [];
    for (const [lessonIndex, lessonSeed] of lessonSeeds.entries()) {
      const existingLesson = unit.lessons.find((item) => item.slug === lessonSeed.slug);
      const lessonData = { title: lessonSeed.title, description: lessonSeed.description, order: lessonIndex + 1, estimatedMinutes: lessonIndex === 0 ? 10 : lessonIndex === 1 ? 6 : 3, status: ContentStatus.PUBLISHED };
      const lesson = existingLesson ? await prisma.lesson.update({ where: { id: existingLesson.id }, data: lessonData, include: { activities: true } }) : await prisma.lesson.create({ data: { unitId: unit.id, slug: lessonSeed.slug, ...lessonData }, include: { activities: true } });
      activeLessonIds.push(lesson.id); const published = lesson.activities.filter((activity) => activity.status === ContentStatus.PUBLISHED);
      for (const activitySeed of lessonSeed.activities) {
        const existing = published.find((activity) => activity.order === activitySeed.order);
        const data = { ...activitySeed, payload: activitySeed.payload as Prisma.InputJsonValue, required: true, status: ContentStatus.PUBLISHED };
        if (existing) await prisma.activity.update({ where: { id: existing.id }, data }); else await prisma.activity.create({ data: { lessonId: lesson.id, ...data } });
        activityCount += 1;
      }
      await prisma.activity.updateMany({ where: { lessonId: lesson.id, order: { gt: lessonSeed.activities.length } }, data: { status: ContentStatus.DRAFT } });
    }
    for (const oldLesson of unit.lessons.filter((item) => !activeLessonIds.includes(item.id))) { await prisma.activity.updateMany({ where: { lessonId: oldLesson.id }, data: { status: ContentStatus.DRAFT } }); await prisma.lesson.update({ where: { id: oldLesson.id }, data: { status: ContentStatus.DRAFT } }); }
  }
  for (const oldUnit of course.units.filter((item) => !activeUnitIds.includes(item.id))) { await prisma.activity.updateMany({ where: { lesson: { unitId: oldUnit.id } }, data: { status: ContentStatus.DRAFT } }); await prisma.lesson.updateMany({ where: { unitId: oldUnit.id }, data: { status: ContentStatus.DRAFT } }); await prisma.unit.update({ where: { id: oldUnit.id }, data: { status: ContentStatus.DRAFT } }); }
  console.log(`Đã đồng bộ ${basicEnglishTwoUnits.length} chặng với ${activityCount} hoạt động.`);
}
main().finally(() => prisma.$disconnect());

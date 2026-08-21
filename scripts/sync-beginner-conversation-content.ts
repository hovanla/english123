import { AssetLicense, ContentStatus, Prisma } from "@prisma/client";
import { prisma } from "../src/lib/prisma";
import {
  beginnerConversationBoardUrl,
  beginnerConversationUnits,
  buildBeginnerConversationLessons,
} from "../src/lib/beginner-conversation-content";

async function main() {
  const grade = await prisma.grade.upsert({
    where: { slug: "giao-tiep-mat-goc" },
    create: {
      slug: "giao-tiep-mat-goc",
      name: "Giao tiếp nền tảng",
      level: "Người mới bắt đầu",
      description: "Lộ trình giao tiếp thực tế dành cho người cần học lại từ đầu.",
      order: 13,
    },
    update: {
      name: "Giao tiếp nền tảng",
      level: "Người mới bắt đầu",
      description: "Lộ trình giao tiếp thực tế dành cho người cần học lại từ đầu.",
      order: 13,
    },
  });
  const baseCourse = await prisma.course.upsert({
    where: { gradeId_slug: { gradeId: grade.id, slug: "giao-tiep-cho-nguoi-mat-goc" } },
    create: {
      gradeId: grade.id,
      slug: "giao-tiep-cho-nguoi-mat-goc",
      title: "Giao tiếp nền tảng trong 35 ngày",
      description: "35 chủ đề đời thực, 280 từ khóa và 140 lượt phản xạ nghe–nói dành cho người học lại từ đầu.",
      order: 1,
      status: ContentStatus.PUBLISHED,
    },
    update: {
      title: "Giao tiếp nền tảng trong 35 ngày",
      description: "35 chủ đề đời thực, 280 từ khóa và 140 lượt phản xạ nghe–nói dành cho người học lại từ đầu.",
      status: ContentStatus.PUBLISHED,
    },
  });
  const course = await prisma.course.findUniqueOrThrow({
    where: { id: baseCourse.id },
    include: {
      units: {
        include: {
          lessons: {
            include: { activities: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });

  const activeUnitIds: string[] = [];
  let activityCount = 0;
  for (const [unitIndex, seed] of beginnerConversationUnits.entries()) {
    const existingUnit = course.units.find((item) => item.slug === seed.slug);
    const imageUrl = beginnerConversationBoardUrl(seed.slug);
    const unitData = {
      title: seed.title,
      theme: seed.theme,
      description: seed.description,
      imageUrl,
      order: unitIndex + 1,
      status: ContentStatus.PUBLISHED,
    };
    const unit = existingUnit
      ? await prisma.unit.update({
          where: { id: existingUnit.id },
          data: unitData,
          include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } },
        })
      : await prisma.unit.create({
          data: { courseId: course.id, slug: seed.slug, ...unitData },
          include: { lessons: { include: { activities: { orderBy: { order: "asc" } } } } },
        });
    activeUnitIds.push(unit.id);

    await prisma.asset.upsert({
      where: { url: imageUrl },
      create: {
        url: imageUrl,
        pathname: imageUrl.replace(/^\//, ""),
        contentType: "image/svg+xml",
        altText: `Bộ tranh giao tiếp chủ đề ${seed.theme}`,
        source: "English123 · minh họa SVG tự biên soạn",
        license: AssetLicense.OWNED,
        width: 1400,
        height: 1050,
      },
      update: {
        pathname: imageUrl.replace(/^\//, ""),
        altText: `Bộ tranh giao tiếp chủ đề ${seed.theme}`,
        source: "English123 · minh họa SVG tự biên soạn",
        license: AssetLicense.OWNED,
        width: 1400,
        height: 1050,
      },
    });

    const lessonSeeds = buildBeginnerConversationLessons(seed);
    const activeLessonIds: string[] = [];
    for (const [lessonIndex, lessonSeed] of lessonSeeds.entries()) {
      const existingLesson = unit.lessons.find((item) => item.slug === lessonSeed.slug);
      const lessonData = {
        title: lessonSeed.title,
        description: lessonSeed.description,
        order: lessonIndex + 1,
        estimatedMinutes: lessonIndex === 0 ? 8 : 6,
        status: ContentStatus.PUBLISHED,
      };
      const lesson = existingLesson
        ? await prisma.lesson.update({
            where: { id: existingLesson.id },
            data: lessonData,
            include: { activities: true },
          })
        : await prisma.lesson.create({
            data: { unitId: unit.id, slug: lessonSeed.slug, ...lessonData },
            include: { activities: true },
          });
      activeLessonIds.push(lesson.id);
      const published = lesson.activities.filter((activity) => activity.status === ContentStatus.PUBLISHED);
      for (const activitySeed of lessonSeed.activities) {
        const existing = published.find((activity) => activity.order === activitySeed.order);
        const data = {
          ...activitySeed,
          payload: activitySeed.payload as Prisma.InputJsonValue,
          required: true,
          status: ContentStatus.PUBLISHED,
        };
        if (existing) await prisma.activity.update({ where: { id: existing.id }, data });
        else await prisma.activity.create({ data: { lessonId: lesson.id, ...data } });
        activityCount += 1;
      }
      await prisma.activity.updateMany({
        where: { lessonId: lesson.id, order: { gt: lessonSeed.activities.length } },
        data: { status: ContentStatus.DRAFT },
      });
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

  console.log(`Đã đồng bộ ${beginnerConversationUnits.length} ngày với ${activityCount} hoạt động.`);
}

main().finally(() => prisma.$disconnect());

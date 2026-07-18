import { ContentStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function getPublishedGrades() {
  return prisma.grade.findMany({
    orderBy: { order: "asc" },
    include: {
      courses: {
        where: { status: ContentStatus.PUBLISHED }, orderBy: { order: "asc" },
        include: { units: { where: { status: ContentStatus.PUBLISHED }, orderBy: { order: "asc" }, select: { id: true, slug: true, title: true, theme: true, description: true, imageUrl: true } } },
      },
    },
  });
}

export function getPublishedUnit(gradeSlug: string, unitSlug: string) {
  return prisma.unit.findFirst({
    where: { slug: unitSlug, status: ContentStatus.PUBLISHED, course: { status: ContentStatus.PUBLISHED, grade: { slug: gradeSlug } } },
    include: {
      course: { include: { grade: true, units: { where: { status: ContentStatus.PUBLISHED }, orderBy: { order: "asc" }, select: { id: true, slug: true, title: true, theme: true, order: true } } } },
      lessons: {
        where: { status: ContentStatus.PUBLISHED }, orderBy: { order: "asc" },
        include: { activities: { where: { status: ContentStatus.PUBLISHED }, orderBy: { order: "asc" } } },
      },
    },
  });
}

export function getAdminCurriculum() {
  return prisma.grade.findMany({
    orderBy: { order: "asc" },
    include: { courses: { orderBy: { order: "asc" }, include: { units: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" }, include: { activities: { orderBy: { order: "asc" } } } } } } } } },
  });
}

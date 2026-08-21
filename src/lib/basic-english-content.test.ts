import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { basicEnglishBoardUrl, basicEnglishUnits, buildBasicEnglishLessons } from "./basic-english-content";

describe("basic English curriculum", () => {
  it("contains 14 lessons, two reviews and one final test", () => {
    expect(basicEnglishUnits).toHaveLength(17);
    expect(basicEnglishUnits.filter((unit) => unit.title.startsWith("Bài "))).toHaveLength(14);
    expect(basicEnglishUnits.filter((unit) => unit.title.startsWith("Ôn tập"))).toHaveLength(2);
    expect(basicEnglishUnits.at(-1)?.title).toBe("Kiểm tra cuối khóa");
    expect(new Set(basicEnglishUnits.map((unit) => unit.slug)).size).toBe(17);
  });

  it("builds valid visual, reaction and grammar activities", () => {
    for (const unit of basicEnglishUnits) {
      const lessons = buildBasicEnglishLessons(unit);
      expect(unit.words).toHaveLength(10);
      expect(unit.sentences).toHaveLength(4);
      expect(unit.visuals).toHaveLength(14);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau", "kiem-tra"]);
      expect(lessons.map((lesson) => lesson.activities.length)).toEqual([12, 4, 2]);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons.slice(0, 2).flatMap((lesson) => lesson.activities).filter((activity) => activity.type !== "MATCHING").every((activity) => activity.payload.imageUrl === basicEnglishBoardUrl(unit.slug))).toBe(true);
    }
  });
});

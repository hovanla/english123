import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { advancedEnglishBoardUrl, advancedEnglishUnits, buildAdvancedEnglishLessons } from "./advanced-english-content";

describe("advanced English curriculum", () => {
  it("contains 12 topic lessons and three review checkpoints", () => {
    expect(advancedEnglishUnits).toHaveLength(15);
    expect(advancedEnglishUnits.filter((unit) => unit.title.startsWith("Bài "))).toHaveLength(12);
    expect(advancedEnglishUnits.filter((unit) => unit.title.startsWith("Ôn tập"))).toHaveLength(3);
    expect(new Set(advancedEnglishUnits.map((unit) => unit.slug)).size).toBe(15);
  });

  it("builds valid visual, reaction and grammar activities", () => {
    for (const unit of advancedEnglishUnits) {
      const lessons = buildAdvancedEnglishLessons(unit);
      expect(unit.words).toHaveLength(10);
      expect(unit.sentences).toHaveLength(4);
      expect(unit.visuals).toHaveLength(14);
      expect(lessons.map((lesson) => lesson.activities.length)).toEqual([12, 4, 2]);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons.slice(0, 2).flatMap((lesson) => lesson.activities).filter((activity) => activity.type !== "MATCHING").every((activity) => activity.payload.imageUrl === advancedEnglishBoardUrl(unit.slug))).toBe(true);
    }
  });
});

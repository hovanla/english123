import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { basicEnglishTwoBoardUrl, basicEnglishTwoUnits, buildBasicEnglishTwoLessons } from "./basic-english-two-content";

describe("basic English two curriculum", () => {
  it("contains 12 topic lessons and three review checkpoints", () => {
    expect(basicEnglishTwoUnits).toHaveLength(15);
    expect(basicEnglishTwoUnits.filter((unit) => unit.title.startsWith("Bài "))).toHaveLength(12);
    expect(basicEnglishTwoUnits.filter((unit) => unit.title.startsWith("Ôn tập"))).toHaveLength(3);
  });

  it("builds valid visual, reaction and grammar activities", () => {
    for (const unit of basicEnglishTwoUnits) {
      const lessons = buildBasicEnglishTwoLessons(unit);
      expect(unit.words).toHaveLength(10);
      expect(unit.sentences).toHaveLength(4);
      expect(unit.visuals).toHaveLength(14);
      expect(lessons.map((lesson) => lesson.activities.length)).toEqual([12, 4, 2]);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons.slice(0, 2).flatMap((lesson) => lesson.activities).filter((activity) => activity.type !== "MATCHING").every((activity) => activity.payload.imageUrl === basicEnglishTwoBoardUrl(unit.slug))).toBe(true);
    }
  });
});

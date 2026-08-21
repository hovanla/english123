import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeEightLessons, gradeEightBoardUrl, gradeEightUnits } from "./grade-eight-content";

const expectedTitles = [
  "My Friends", "Making Arrangements", "At Home", "Our Past", "Study Habits", "The Young Pioneers Club",
  "My Neighborhood", "Country Life and City Life", "A First-Aid Course", "Recycling",
  "Traveling Around Vietnam", "A Vacation Abroad", "Festivals", "Wonders of the World", "Computers", "Inventions",
];

describe("grade eight curriculum", () => {
  it("contains the 16 reference-outline units in order", () => {
    expect(gradeEightUnits).toHaveLength(16);
    expect(gradeEightUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });

  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeEightUnits) {
      const lessons = buildGradeEightLessons(unit);
      expect(unit.words).toHaveLength(12);
      expect(unit.sentences).toHaveLength(4);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(14);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, 12).every((activity, index) => activity.payload.imageUrl === gradeEightBoardUrl(unit.slug) && activity.payload.spriteIndex === index)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.type === "SENTENCE" && activity.payload.mode === "RESPONSE_RECALL" && activity.payload.imageUrl === gradeEightBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.imageHint)).toBe(true);
      expect(lessons[1].activities[1].payload.partnerLine).toBe(unit.sentences[0][0]);
    }
  });
});

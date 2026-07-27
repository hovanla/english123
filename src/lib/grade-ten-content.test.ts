import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeTenLessons, gradeTenBoardUrl, gradeTenUnits } from "./grade-ten-content";

const expectedTitles = [
  "A Day in the Life of", "School Talks", "People's Background", "Special Education",
  "Technology and You", "An Excursion", "The Mass Media", "The Story of My Village",
  "Undersea World", "Conservation", "National Parks", "Music", "Films and Cinema",
  "The World Cup", "Cities", "Historical Place",
];

describe("grade ten curriculum", () => {
  it("contains the 16 reference-outline units in order", () => {
    expect(gradeTenUnits).toHaveLength(16);
    expect(gradeTenUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });

  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeTenUnits) {
      const lessons = buildGradeTenLessons(unit);
      expect(unit.words).toHaveLength(12);
      expect(unit.sentences).toHaveLength(4);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(14);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, 12).every((activity, index) => activity.payload.imageUrl === gradeTenBoardUrl(unit.slug) && activity.payload.spriteIndex === index)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.spriteIndex === 21 + index && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

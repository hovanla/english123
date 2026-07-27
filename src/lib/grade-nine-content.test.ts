import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeNineLessons, gradeNineBoardUrl, gradeNineUnits } from "./grade-nine-content";

const expectedTitles = [
  "A Visit from a Pen Pal", "Clothing", "A Trip to the Countryside", "Learning a Foreign Language", "The Media",
  "The Environment", "Saving Energy", "Celebrations", "Natural Disasters", "Life on the Other Planets",
];

describe("grade nine curriculum", () => {
  it("contains the 10 reference-outline units in order", () => {
    expect(gradeNineUnits).toHaveLength(10);
    expect(gradeNineUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });

  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeNineUnits) {
      const lessons = buildGradeNineLessons(unit);
      expect(unit.words).toHaveLength(12);
      expect(unit.sentences).toHaveLength(4);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(14);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, 12).every((activity, index) => activity.payload.imageUrl === gradeNineBoardUrl(unit.slug) && activity.payload.spriteIndex === index)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.spriteIndex === 21 + index && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

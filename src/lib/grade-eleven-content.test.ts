import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeElevenLessons, gradeElevenBoardUrl, gradeElevenUnits } from "./grade-eleven-content";

const expectedTitles = [
  "Friendship", "Personal Experiences", "A Party", "Volunteer Work", "Illiteracy",
  "Competitions", "World Population", "Celebrations", "The Post Office", "Nature in Danger",
  "Sources of Energy", "The Asian Games", "Hobbies", "Recreation", "Space Conquest",
  "The Wonders of the World",
];

describe("grade eleven curriculum", () => {
  it("contains the 16 reference-outline units in order", () => {
    expect(gradeElevenUnits).toHaveLength(16);
    expect(gradeElevenUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });

  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeElevenUnits) {
      const lessons = buildGradeElevenLessons(unit);
      expect(unit.words).toHaveLength(12);
      expect(unit.sentences).toHaveLength(4);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(14);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, 12).every((activity, index) => activity.payload.imageUrl === gradeElevenBoardUrl(unit.slug) && activity.payload.spriteIndex === index)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.spriteIndex === 21 + index && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeSevenLessons, gradeSevenBoardUrl, gradeSevenUnits } from "./grade-seven-content";

const expectedTitles = [
  "Back to School", "Personal Information", "At Home", "At School", "Work and Play", "After School",
  "The World of Work", "Places", "At Home and Away", "Health and Hygiene", "Keep Fit, Stay Healthy",
  "Let's Eat!", "Activities", "Freetime Fun", "Going Out", "People and Places",
];

describe("grade seven curriculum", () => {
  it("contains the 16 reference-outline units in order", () => {
    expect(gradeSevenUnits).toHaveLength(16);
    expect(gradeSevenUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });

  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeSevenUnits) {
      const lessons = buildGradeSevenLessons(unit);
      expect(unit.words).toHaveLength(12);
      expect(unit.sentences).toHaveLength(4);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(14);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, 12).every((activity, index) => activity.payload.imageUrl === gradeSevenBoardUrl(unit.slug) && activity.payload.spriteIndex === index)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.type === "SENTENCE" && activity.payload.mode === "RESPONSE_RECALL" && activity.payload.imageUrl === gradeSevenBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.imageHint)).toBe(true);
      expect(lessons[1].activities[1].payload.partnerLine).toBe(unit.sentences[0][0]);
    }
  });
});

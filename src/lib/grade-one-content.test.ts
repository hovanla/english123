import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeOneLessons, gradeOneBoardUrl, gradeOneUnits } from "./grade-one-content";

const expectedHeadlines = [
  "How are you?", "He is my brother.", "What's this?", "What are these?", "What color is it?",
  "This is a blue circle.", "I'm tall.", "What color are they?", "How many?", "There is a board.",
  "There are eleven planes.", "I like skipping.", "Do you like fish?", "I have bread for breakfast.", "I can swim.",
  "Can you play the piano?", "Where are you?", "Is it a buffalo?", "What sports do you like?", "What's the weather like?",
];

describe("grade one curriculum", () => {
  it("contains the 20 public-outline units in order", () => {
    expect(gradeOneUnits).toHaveLength(20);
    expect(gradeOneUnits.map((unit) => unit.sentences[0][0])).toEqual(expectedHeadlines);
    expect(gradeOneUnits[0].words.map(([word]) => word)).toEqual(["listen", "repeat", "look", "be quiet"]);
    expect(gradeOneUnits[19].words.map(([word]) => word)).toEqual(["hot", "cold", "cool", "rainy", "sunny"]);
  });

  it("builds image-led word and sentence lessons with valid payloads", () => {
    for (const unit of gradeOneUnits) {
      const lessons = buildGradeOneLessons(unit);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(unit.words.length + 1);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, unit.words.length).every((activity, index) => activity.payload.imageUrl === gradeOneBoardUrl(unit.slug) && activity.payload.spriteIndex === index && activity.payload.spriteRows === 3)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.imageUrl === gradeOneBoardUrl(unit.slug) && activity.payload.spriteIndex === index + 5 && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

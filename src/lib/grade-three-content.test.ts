import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeThreeLessons, gradeThreeBoardUrl, gradeThreeUnits } from "./grade-three-content";

const expectedTitles = [
  "Hello", "What's your name?", "This is Minnie.", "How old are you?", "Are they your friends?",
  "Stand up!", "That's my school.", "This is my pen.", "What color is it?", "What do you do at break time?",
  "This is my family.", "This is my house.", "Where's my book?", "Are there any posters in the room?", "Do you have any toys?",
  "Do you have any pets?", "What toys do you like?", "What are you doing?", "They're in the park.", "Where's Sa Pa?",
];

describe("grade three curriculum", () => {
  it("contains the 20 public-outline units in order", () => {
    expect(gradeThreeUnits).toHaveLength(20);
    expect(gradeThreeUnits.map((unit) => unit.title)).toEqual(expectedTitles);
    expect(gradeThreeUnits[0].words.map(([word]) => word)).toEqual([
      "hello", "hi", "nice to meet you", "goodbye", "bye", "bye-bye", "fine", "thanks", "thank you", "how are you",
    ]);
    expect(gradeThreeUnits[19].words.map(([word]) => word)).toEqual([
      "city", "island", "north", "south", "central", "bay", "water puppet theatre", "near", "far",
    ]);
  });

  it("builds complete image-led word and sentence lessons with valid payloads", () => {
    for (const unit of gradeThreeUnits) {
      const lessons = buildGradeThreeLessons(unit);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(unit.words.length + Math.ceil(unit.words.length / 8));
      expect(lessons[1].activities).toHaveLength(4);
      expect(unit.words.length + unit.sentences.length).toBeLessThanOrEqual(20);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, unit.words.length).every((activity, index) => activity.payload.imageUrl === gradeThreeBoardUrl(unit.slug) && activity.payload.spriteIndex === index && activity.payload.spriteColumns === 5 && activity.payload.spriteRows === 4)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.imageUrl === gradeThreeBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

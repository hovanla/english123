import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeFourLessons, gradeFourBoardUrl, gradeFourUnits } from "./grade-four-content";

const expectedTitles = [
  "Nice to see you again.", "I'm from Japan.", "What day is it today?", "When's your birthday?", "Can you swim?",
  "Where's your school?", "What do you like doing?", "What subjects do you have today?", "What are they doing?", "Where were you yesterday?",
  "What time is it?", "What does your father do?", "Would you like some milk?", "What does he look like?", "When's Children's Day?",
  "Let's go to the bookshop.", "How much is the T-shirt?", "What's your phone number?", "What animal do you want to see?", "What are you going to do this summer?",
];

describe("grade four curriculum", () => {
  it("contains the 20 public-outline units in order", () => {
    expect(gradeFourUnits).toHaveLength(20);
    expect(gradeFourUnits.map((unit) => unit.title)).toEqual(expectedTitles);
    expect(gradeFourUnits[0].words.map(([word]) => word)).toEqual([
      "morning", "afternoon", "evening", "night", "see", "meet", "pupil", "study", "tomorrow",
    ]);
    expect(gradeFourUnits[19].words.map(([word]) => word)).toEqual([
      "summer", "summer holidays", "stay", "hotel", "seafood", "sea", "beach", "delicious", "build a sandcastle", "go on a boat cruise",
    ]);
  });

  it("builds complete image-led word and sentence lessons with valid payloads", () => {
    for (const unit of gradeFourUnits) {
      const lessons = buildGradeFourLessons(unit);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(unit.words.length + Math.ceil(unit.words.length / 8));
      expect(lessons[1].activities).toHaveLength(4);
      expect(unit.words.length + unit.sentences.length).toBeLessThanOrEqual(25);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, unit.words.length).every((activity, index) => activity.payload.imageUrl === gradeFourBoardUrl(unit.slug) && activity.payload.spriteIndex === index && activity.payload.spriteColumns === 5 && activity.payload.spriteRows === 5)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.imageUrl === gradeFourBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

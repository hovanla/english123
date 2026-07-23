import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeFiveLessons, gradeFiveBoardUrl, gradeFiveUnits } from "./grade-five-content";

const expectedTitles = [
  "What's your address?", "I always get up early. How about you?", "Where did you go on holiday?", "Did you go to the party?", "Where will you be this weekend?",
  "How many lessons do you have today?", "How do you learn English?", "What are you reading?", "What did you see at the zoo?", "When will Sports Day be?",
  "What's the matter with you?", "Don't ride your bike too fast!", "What do you do in your free time?", "What happened in the story?", "What would you like to be in the future?",
  "Where's the post office?", "What would you like to eat?", "What will the weather be like tomorrow?", "Which place would you like to visit?", "Which one is more exciting, life in the city or life in the countryside?",
];

describe("grade five curriculum", () => {
  it("contains the 20 public-outline units in order", () => {
    expect(gradeFiveUnits).toHaveLength(20);
    expect(gradeFiveUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });

  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeFiveUnits) {
      const lessons = buildGradeFiveLessons(unit);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(unit.words.length + Math.ceil(unit.words.length / 8));
      expect(lessons[1].activities).toHaveLength(4);
      expect(unit.words.length + unit.sentences.length).toBeLessThanOrEqual(25);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, unit.words.length).every((activity, index) => activity.payload.imageUrl === gradeFiveBoardUrl(unit.slug) && activity.payload.spriteIndex === index && activity.payload.spriteColumns === 5 && activity.payload.spriteRows === 5)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.imageUrl === gradeFiveBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

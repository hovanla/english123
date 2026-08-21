import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeSixLessons, gradeSixBoardUrl, gradeSixUnits } from "./grade-six-content";

const expectedTitles = [
  "Greetings", "At School", "At Home", "Big or Small?", "Things I Do", "Places", "Your House", "Out and About",
  "The Body", "Staying Healthy", "What Do You Eat?", "Sports and Pastimes", "Activities and Seasons", "Making Plans", "Countries", "Man and Environment",
];

describe("grade six curriculum", () => {
  it("contains the 16 public-outline units in order", () => {
    expect(gradeSixUnits).toHaveLength(16);
    expect(gradeSixUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });
  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeSixUnits) {
      const lessons = buildGradeSixLessons(unit);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(unit.words.length + Math.ceil(unit.words.length / 8));
      expect(lessons[1].activities).toHaveLength(4);
      expect(unit.words.length + 4).toBeLessThanOrEqual(25);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, unit.words.length).every((activity, index) => activity.payload.imageUrl === gradeSixBoardUrl(unit.slug) && activity.payload.spriteIndex === index && activity.payload.spriteColumns === 5 && activity.payload.spriteRows === 5)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.type === "SENTENCE" && activity.payload.mode === "RESPONSE_RECALL" && activity.payload.imageUrl === gradeSixBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.imageHint)).toBe(true);
      expect(lessons[1].activities[1].payload.partnerLine).toBe(unit.sentences[0][0]);
    }
  });
});

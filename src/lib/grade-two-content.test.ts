import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeTwoLessons, gradeTwoBoardUrl, gradeTwoUnits } from "./grade-two-content";

const expectedHeadlines = [
  "That is my classroom.", "What day is it?", "What's your job?", "He is brave.", "Where is she?",
  "Where is it?", "There is a mirror in the bathroom.", "Let's draw pictures.", "Are you happy?", "What do you like doing?",
  "What's wrong?", "You should wash your hands.", "Do you want some cabbage?", "I like guavas.", "Please give me a knife.",
  "Where are you going?", "You should wear a helmet.", "How do you go to school?", "It's hot in the summer.", "I want to go to the beach on holiday.",
];

describe("grade two curriculum", () => {
  it("contains the 20 public-outline units in order", () => {
    expect(gradeTwoUnits).toHaveLength(20);
    expect(gradeTwoUnits.map((unit) => unit.sentences[0][0])).toEqual(expectedHeadlines);
    expect(gradeTwoUnits[0].words.map(([word]) => word)).toEqual(["school bus", "school yard", "classroom", "library", "gym"]);
    expect(gradeTwoUnits[19].words.map(([word]) => word)).toEqual(["beach", "mountain", "countryside", "island", "city"]);
  });

  it("builds image-led word and sentence lessons with valid payloads", () => {
    for (const unit of gradeTwoUnits) {
      const lessons = buildGradeTwoLessons(unit);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(unit.words.length + 1);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, unit.words.length).every((activity, index) => activity.payload.imageUrl === gradeTwoBoardUrl(unit.slug) && activity.payload.spriteIndex === index && activity.payload.spriteColumns === 4)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.payload.imageUrl === gradeTwoBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.mode === "AUDIO_GUESS")).toBe(true);
    }
  });
});

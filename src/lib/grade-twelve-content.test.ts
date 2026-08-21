import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildGradeTwelveLessons, gradeTwelveBoardUrl, gradeTwelveUnits } from "./grade-twelve-content";

const expectedTitles = [
  "Home Life", "Cultural Diversity", "Ways of Socialising", "School Education System",
  "Higher Education", "Future Jobs", "Economic Reforms", "Life in the Future", "Deserts",
  "Endangered Species", "Books", "Water Sports", "The 22nd SEA Games",
  "International Organizations", "Women in Society", "The Association of Southeast Asian Nations",
];

describe("grade twelve curriculum", () => {
  it("contains the 16 reference-outline units in order", () => {
    expect(gradeTwelveUnits).toHaveLength(16);
    expect(gradeTwelveUnits.map((unit) => unit.title)).toEqual(expectedTitles);
  });

  it("builds complete valid image-led lessons", () => {
    for (const unit of gradeTwelveUnits) {
      const lessons = buildGradeTwelveLessons(unit);
      expect(unit.words).toHaveLength(12);
      expect(unit.sentences).toHaveLength(4);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons[0].activities).toHaveLength(14);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities.slice(0, 12).every((activity, index) => activity.payload.imageUrl === gradeTwelveBoardUrl(unit.slug) && activity.payload.spriteIndex === index)).toBe(true);
      expect(lessons[1].activities.every((activity, index) => activity.type === "SENTENCE" && activity.payload.mode === "RESPONSE_RECALL" && activity.payload.imageUrl === gradeTwelveBoardUrl(unit.slug) && activity.payload.spriteIndex === unit.words.length + index && activity.payload.imageHint)).toBe(true);
      expect(lessons[1].activities[1].payload.partnerLine).toBe(unit.sentences[0][0]);
    }
  });
});

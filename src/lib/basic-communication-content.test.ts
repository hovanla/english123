import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { basicCommunicationBoardUrl, basicCommunicationUnits, buildBasicCommunicationLessons } from "./basic-communication-content";

describe("basic communication curriculum", () => {
  it("contains 23 topic lessons and two review checkpoints", () => {
    expect(basicCommunicationUnits).toHaveLength(25);
    expect(basicCommunicationUnits.filter((unit) => unit.title.startsWith("Bài "))).toHaveLength(23);
    expect(basicCommunicationUnits.filter((unit) => unit.title.startsWith("Ôn tập"))).toHaveLength(2);
    expect(new Set(basicCommunicationUnits.map((unit) => unit.slug)).size).toBe(25);
  });

  it("builds valid visual, reaction and quick-check activities", () => {
    for (const unit of basicCommunicationUnits) {
      const lessons = buildBasicCommunicationLessons(unit);
      expect(unit.words).toHaveLength(10);
      expect(unit.sentences).toHaveLength(4);
      expect(unit.visuals).toHaveLength(14);
      expect(lessons.map((lesson) => lesson.activities.length)).toEqual([12, 4, 2]);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons.slice(0, 2).flatMap((lesson) => lesson.activities).filter((activity) => activity.type !== "MATCHING").every((activity) => activity.payload.imageUrl === basicCommunicationBoardUrl(unit.slug))).toBe(true);
    }
  });
});

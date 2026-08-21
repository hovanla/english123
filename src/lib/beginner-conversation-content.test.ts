import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import {
  beginnerConversationBoardUrl,
  beginnerConversationUnits,
  buildBeginnerConversationLessons,
} from "./beginner-conversation-content";

describe("beginner conversation curriculum", () => {
  it("contains the complete 35-day public topic outline", () => {
    expect(beginnerConversationUnits).toHaveLength(35);
    expect(beginnerConversationUnits[0].title).toBe("Ngày 1 · Gặp nhau lần đầu");
    expect(beginnerConversationUnits[34].title).toBe("Ngày 35 · Ở nơi làm việc");
    expect(new Set(beginnerConversationUnits.map((unit) => unit.slug)).size).toBe(35);
  });

  it("builds valid image-led vocabulary and reaction lessons", () => {
    for (const unit of beginnerConversationUnits) {
      const lessons = buildBeginnerConversationLessons(unit);
      expect(unit.words).toHaveLength(8);
      expect(unit.sentences).toHaveLength(4);
      expect(unit.visuals).toHaveLength(12);
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-khoa", "hoi-thoai"]);
      expect(lessons[0].activities).toHaveLength(9);
      expect(lessons[1].activities).toHaveLength(4);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons.flatMap((lesson) => lesson.activities).filter((activity) => activity.type !== "MATCHING").every((activity) => activity.payload.imageUrl === beginnerConversationBoardUrl(unit.slug))).toBe(true);
    }
  });
});

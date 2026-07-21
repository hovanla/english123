import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildPreschoolLessons, getPreschoolScene } from "./preschool-content";

const slugs = [
  "hello", "family", "school", "feelings", "toys", "colors", "body", "face", "shapes", "clothes",
  "fruit", "drinks", "snacks", "in-the-room", "at-home", "i-can", "pets", "the-farm", "the-zoo", "the-park",
];

describe("preschool reflex curriculum", () => {
  it("defines valid no-hint listening and real-life activities for all 20 units", () => {
    for (const [index, slug] of slugs.entries()) {
      expect(getPreschoolScene(slug), `scene ${slug}`).toBeTruthy();
      const lessons = buildPreschoolLessons({
        slug,
        theme: slug,
        words: [["one", "một"], ["two", "hai"], ["three", "ba"], ["four", "bốn"]],
        letters: [String.fromCharCode(65 + Math.min(index, 25))],
        number: index % 2 === 0 ? index / 2 + 1 : undefined,
      });
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["phan-xa-doi-thuc", "nhin-nghe-doan-tu", "chu-cai-chu-so"]);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities).toHaveLength(4);
      expect(lessons[0].activities.every((activity) => activity.type === "FLASHCARD" && activity.payload.mode === "AUDIO_GUESS" && !("options" in activity.payload))).toBe(true);
      expect(lessons[1].activities.filter((activity) => activity.payload.mode === "AUDIO_GUESS").every((activity) => !("options" in activity.payload))).toBe(true);
      expect(lessons.slice(0, 2).flatMap((lesson) => lesson.activities).some((activity) => activity.type === "SPEAK_REPEAT" || activity.type === "LISTEN_CHOOSE")).toBe(false);
    }
  });
});

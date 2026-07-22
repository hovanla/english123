import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildPreschoolLessons, getPreschoolScene } from "./preschool-content";

const slugs = [
  "hello", "family", "school", "feelings", "toys", "colors", "body", "face", "shapes", "clothes",
  "fruit", "drinks", "snacks", "in-the-room", "at-home", "i-can", "pets", "the-farm", "the-zoo", "the-park",
];

const referenceSentences: Record<string, string> = {
  hello: "What's your name?",
  family: "Who's this?",
  feelings: "Are you happy?",
  toys: "What's this?",
  colors: "What color is it?",
  face: "What are these?",
  shapes: "This is a circle.",
  clothes: "These are my pants.",
  fruit: "I like apples.",
  drinks: "Do you like milk?",
  "at-home": "What are you doing?",
  "the-farm": "Is it a duck?",
  "the-zoo": "What's that?",
};

describe("preschool vocabulary and sentence curriculum", () => {
  it("defines complete no-hint vocabulary and real-life sentences for all 20 units", () => {
    for (const slug of slugs) {
      const scene = getPreschoolScene(slug);
      expect(scene, `scene ${slug}`).toBeTruthy();
      expect(scene.words).toHaveLength(6);
      expect(scene.visuals).toHaveLength(6);
      const lessons = buildPreschoolLessons({
        slug,
        theme: slug,
      });
      expect(lessons.map((lesson) => lesson.slug)).toEqual(["tu-vung", "mau-cau"]);
      expect(lessons.flatMap((lesson) => lesson.activities).every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
      expect(lessons[0].activities).toHaveLength(13);
      expect(lessons[0].activities.filter((activity) => activity.payload.mode === "VISUAL_GUESS")).toHaveLength(6);
      expect(lessons[0].activities.filter((activity) => activity.payload.mode === "AUDIO_GUESS")).toHaveLength(6);
      expect(lessons[1].activities).toHaveLength(slug === "hello" ? 6 : 4);
      expect(lessons[1].activities.every((activity) => activity.type === "FLASHCARD" && activity.payload.mode === "AUDIO_GUESS" && !("options" in activity.payload))).toBe(true);
      expect(lessons.flatMap((lesson) => lesson.activities).some((activity) => activity.title.includes("Chữ") || activity.title.includes("Số"))).toBe(false);
    }
  });

  it("keeps the core sentence topic from the reference curriculum", () => {
    for (const [slug, expected] of Object.entries(referenceSentences)) {
      const scene = getPreschoolScene(slug);
      const sentences = scene.situations.flatMap((situation) => [situation.target, situation.reply]);
      expect(sentences, `core sentence ${slug}`).toContain(expected);
    }
  });
});

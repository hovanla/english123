import { describe, expect, it } from "vitest";
import { shuffleVocabularyActivities } from "./vocabulary-order";

const lesson = {
  id: "lesson-1",
  activities: [
    { id: "word-1", type: "FLASHCARD" },
    { id: "word-2", type: "FLASHCARD" },
    { id: "word-3", type: "FLASHCARD" },
    { id: "quiz", type: "MULTIPLE_CHOICE" },
    { id: "sentence-1", type: "FLASHCARD" },
    { id: "sentence-2", type: "FLASHCARD" },
  ],
};

describe("vocabulary activity order", () => {
  it("changes each vocabulary run without moving other activity types", () => {
    const [shuffled] = shuffleVocabularyActivities([lesson], () => 0.999);

    expect(shuffled.activities.map((activity) => activity.id)).toEqual([
      "word-2", "word-3", "word-1", "quiz", "sentence-2", "sentence-1",
    ]);
    expect(shuffled.activities[3]).toBe(lesson.activities[3]);
  });

  it("does not mutate curriculum data", () => {
    shuffleVocabularyActivities([lesson], () => 0);
    expect(lesson.activities.map((activity) => activity.id)).toEqual([
      "word-1", "word-2", "word-3", "quiz", "sentence-1", "sentence-2",
    ]);
  });

  it("leaves a single vocabulary activity unchanged", () => {
    const single = { id: "lesson-2", activities: [{ id: "only-word", type: "FLASHCARD" }] };
    expect(shuffleVocabularyActivities([single], () => 0)[0].activities).toEqual(single.activities);
  });
});

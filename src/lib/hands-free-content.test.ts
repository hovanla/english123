import { describe, expect, it } from "vitest";
import { buildListeningItems } from "./hands-free-content";

const activities = [
  { id: "a", type: "FLASHCARD", payload: { front: "apple", back: "quả táo" } },
  { id: "b", type: "FLASHCARD", payload: { front: "apple", back: "quả táo" } },
  { id: "c", type: "SENTENCE", payload: { target: "I'm fine.", translation: "Tôi khỏe.", scenario: "Bạn muốn nói mình khỏe.", partnerLine: "How are you?" } },
  { id: "d", type: "MATCHING", payload: { front: "invalid", back: "invalid" } },
];

describe("hands-free lesson selection", () => {
  it("deduplicates visual and audio versions without including quizzes", () => {
    const items = buildListeningItems(activities, "meaning");
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ prompt: "apple", answer: "quả táo", promptLang: "en-US", answerLang: "vi-VN" });
  });
  it("only uses supplied dialogue replies and situations", () => {
    expect(buildListeningItems(activities, "response")).toEqual([{ id: "c", prompt: "How are you?", answer: "I'm fine.", promptLang: "en-US", answerLang: "en-US" }]);
    expect(buildListeningItems(activities, "situation")[0].promptLang).toBe("vi-VN");
  });
  it("filters weak activities before deduplication and handles an empty list", () => {
    expect(buildListeningItems(activities, "meaning", ["b"])[0].id).toBe("b");
    expect(buildListeningItems(activities, "meaning", [])).toEqual([]);
  });
  it("provides an English-only fallback when a curated definition exists", () => {
    const items = buildListeningItems([
      { id: "e", type: "FLASHCARD", payload: { front: "apple", back: "quả táo", definition: "A round fruit that grows on a tree." } },
    ], "meaning");
    expect(items[0].englishAnswer).toBe("A round fruit that grows on a tree.");
  });
});

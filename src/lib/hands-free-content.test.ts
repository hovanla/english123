import { describe, expect, it } from "vitest";
import { buildListeningItems } from "./hands-free-content";

const activities = [
  { id: "a", type: "FLASHCARD", payload: { front: "apple", back: "quả táo", definition: "A round fruit that grows on a tree." } },
  { id: "b", type: "FLASHCARD", payload: { front: "apple", back: "quả táo", definition: "A round fruit that grows on a tree." } },
  { id: "c", type: "SENTENCE", payload: { target: "I'm fine.", translation: "Tôi khỏe.", scenario: "Bạn muốn nói mình khỏe.", partnerLine: "How are you?" } },
  { id: "d", type: "MATCHING", payload: { front: "invalid", back: "invalid" } },
];

describe("hands-free lesson selection", () => {
  it("deduplicates visual and audio versions without including quizzes", () => {
    const items = buildListeningItems(activities, "meaning");
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ id: "a", prompt: "apple", answer: "A round fruit that grows on a tree.", promptLang: "en-US", answerLang: "en-US" });
  });
  it("only uses supplied English dialogue replies", () => {
    expect(buildListeningItems(activities, "response")).toEqual([{ id: "c", prompt: "How are you?", answer: "I'm fine.", promptLang: "en-US", answerLang: "en-US" }]);
  });
  it("filters weak activities before deduplication and handles an empty list", () => {
    expect(buildListeningItems(activities, "meaning", ["b"])[0].id).toBe("b");
    expect(buildListeningItems(activities, "meaning", [])).toEqual([]);
  });
  it("omits vocabulary without a curated English definition", () => {
    expect(buildListeningItems([
      { id: "e", type: "FLASHCARD", payload: { front: "apple", back: "quả táo" } },
    ], "meaning")).toEqual([]);
  });
});

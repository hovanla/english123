import { describe, expect, it } from "vitest";
import { assessPronunciation, normalizeSpeechText } from "./pronunciation";

describe("pronunciation feedback", () => {
  it("normalizes punctuation without losing contractions", () => {
    expect(normalizeSpeechText("I'm fine, thank you!")).toBe("i'm fine thank you");
  });

  it("scores a matching transcript and points out missing words", () => {
    expect(assessPronunciation("Good morning. How are you?", "good morning how are you").score).toBe(100);
    expect(assessPronunciation("Good morning. How are you?", "good morning").needsPractice).toEqual(["how", "are", "you"]);
  });
});

import { describe, expect, it } from "vitest";
import { buildAiPronunciationPrompt, parseAiPronunciationFeedback } from "./ai-pronunciation";

describe("AI pronunciation feedback", () => {
  it("parses a JSON response even when it is wrapped in a code fence", () => {
    expect(parseAiPronunciationFeedback('```json\n{"feedback":"Khá tốt.","tip":"Đọc rõ từ morning."}\n```')).toEqual({
      feedback: "Khá tốt.",
      tip: "Đọc rõ từ morning.",
    });
  });

  it("rejects incomplete or malformed feedback", () => {
    expect(parseAiPronunciationFeedback('{"feedback":"Tốt"}')).toBeNull();
    expect(parseAiPronunciationFeedback("not json")).toBeNull();
  });

  it("tells the model not to pretend it heard the audio", () => {
    const prompt = buildAiPronunciationPrompt({ target: "Good morning", transcript: "good money", score: 50, needsPractice: ["morning"] });
    expect(prompt).toContain("not reliable phoneme measurements");
    expect(prompt).toContain('"target":"Good morning"');
  });

  it("identifies Groq Whisper as the recognizer", () => {
    const prompt = buildAiPronunciationPrompt({ target: "How are you?", transcript: "how are you", score: 100, needsPractice: [], recognizer: "groq-whisper" });
    expect(prompt).toContain('"recognizer":"groq-whisper"');
  });
});

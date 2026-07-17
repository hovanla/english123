import { ActivityType } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { normalizeAnswer, scoreActivity, validateActivityPayload } from "./activities";

describe("activity scoring", () => {
  it("normalizes punctuation, case and accents", () => expect(normalizeAnswer("  HéLLo,   Lan! ")).toBe("hello lan"));
  it("scores a correct multiple choice answer", () => expect(scoreActivity(ActivityType.MULTIPLE_CHOICE, { prompt: "P", options: [{ id: "a", text: "A" }, { id: "b", text: "B" }], correctOptionId: "b" }, { optionId: "b" })).toMatchObject({ score: 100, passed: true }));
  it("scores matching proportionally", () => expect(scoreActivity(ActivityType.MATCHING, { prompt: "P", pairs: [{ left: "red", right: "đỏ" }, { left: "blue", right: "xanh" }] }, { pairs: [{ left: "red", right: "đỏ" }, { left: "blue", right: "sai" }] }).score).toBe(50));
  it("accepts a close spoken transcript", () => expect(scoreActivity(ActivityType.SPEAK_REPEAT, { prompt: "P", target: "My name is Lan" }, { transcript: "my name is Lan" }).passed).toBe(true));
  it("allows the accessibility fallback without recording", () => expect(scoreActivity(ActivityType.SPEAK_REPEAT, { prompt: "P", target: "Hello" }, { unsupported: true, confirmed: true }).passed).toBe(true));
  it("scores writing using length and keywords", () => expect(scoreActivity(ActivityType.SHORT_WRITING, { prompt: "P", minWords: 4, keywords: ["teacher", "school"] }, { text: "My teacher is at school" }).score).toBe(100));
  it("rejects malformed activity payloads", () => expect(validateActivityPayload(ActivityType.MULTIPLE_CHOICE, { prompt: "P", options: [] }).success).toBe(false));
});

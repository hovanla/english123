import { describe, expect, it } from "vitest";
import { buildUnitTutorContext, buildUnitTutorInstructions, containsLikelyPersonalData, extractChatCompletionText, extractResponseText, hasUnsafeSafetyLabel } from "./unit-tutor";

describe("unit tutor", () => {
  const unit = {
    title: "Greetings",
    theme: "Chào hỏi",
    course: { grade: { name: "Lớp 6" } },
    lessons: [{ activities: [
      { payload: { front: "hello", back: "xin chào" } },
      { payload: { target: "How are you?", translation: "Bạn khỏe không?", scenario: "Gặp bạn vào buổi sáng." } },
    ] }],
  };

  it("builds a bounded curriculum context", () => {
    const context = buildUnitTutorContext(unit);
    expect(context).toContain("Vocabulary: hello = xin chào");
    expect(context).toContain("Useful sentence: How are you?");
    expect(buildUnitTutorInstructions(context)).toContain("Do not leave the unit topic");
    expect(buildUnitTutorInstructions(context, "Gặp một người bạn mới.")).toContain("ACTIVE REAL-LIFE ROLE-PLAY");
    expect(buildUnitTutorInstructions(context, "Gặp một người bạn mới.")).toContain("Gặp một người bạn mới.");
  });

  it("detects contact details and extracts Responses API text", () => {
    expect(containsLikelyPersonalData("Email me at student@example.com")).toBe(true);
    expect(containsLikelyPersonalData("How are you today?")).toBe(false);
    expect(extractResponseText({ output: [{ content: [{ text: "Hello!" }] }] })).toBe("Hello!");
  });

  it("extracts NVIDIA chat text without exposing reasoning and reads safety labels", () => {
    const payload = { choices: [{ message: { reasoning_content: "private reasoning", content: "Hello!" } }] };
    expect(extractChatCompletionText(payload)).toBe("Hello!");
    expect(hasUnsafeSafetyLabel({ choices: [{ message: { content: "User Safety: unsafe" } }] })).toBe(true);
    expect(hasUnsafeSafetyLabel({ choices: [{ message: { content: "User Safety: safe" } }] })).toBe(false);
  });
});

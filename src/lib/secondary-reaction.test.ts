import { describe, expect, it } from "vitest";
import { validateActivityPayload } from "./activities";
import { buildSecondaryReactionActivities } from "./secondary-reaction";

describe("secondary reaction activities", () => {
  const sentences: Array<[string, string, string]> = [
    ["How are you?", "Bạn khỏe không?", "Em gặp một người bạn vào buổi sáng."],
    ["I'm fine, thank you.", "Mình khỏe, cảm ơn.", "Em đáp lại lời hỏi thăm."],
  ];

  it("requires active sentence recall instead of self-rated flashcards", () => {
    const activities = buildSecondaryReactionActivities(sentences);
    expect(activities.every((activity) => activity.type === "SENTENCE")).toBe(true);
    expect(activities.every((activity) => activity.payload.mode === "RESPONSE_RECALL")).toBe(true);
    expect(activities.every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
  });

  it("turns the previous line into an English dialogue cue", () => {
    const activities = buildSecondaryReactionActivities(sentences);
    expect(activities[0].payload.partnerLine).toBeUndefined();
    expect(activities[1].payload.partnerLine).toBe("How are you?");
    expect(activities[1].payload.translation).toBe("Mình khỏe, cảm ơn.");
  });

  it("adds an optional situation image and keeps its description behind a hint", () => {
    const activities = buildSecondaryReactionActivities(sentences, {
      imageUrl: "/grade-six/boards/greetings.webp",
      spriteOffset: 12,
      spriteColumns: 5,
      spriteRows: 5,
    });

    expect(activities[0].payload).toMatchObject({
      imageUrl: "/grade-six/boards/greetings.webp",
      imageHint: "Em gặp một người bạn vào buổi sáng.",
      spriteIndex: 12,
      spriteColumns: 5,
      spriteRows: 5,
    });
    expect(activities[1].payload.spriteIndex).toBe(13);
    expect(activities.every((activity) => validateActivityPayload(activity.type, activity.payload).success)).toBe(true);
  });
});

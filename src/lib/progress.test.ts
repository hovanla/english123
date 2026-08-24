import { describe, expect, it } from "vitest";
import { addDays, addMinutes, FORGOTTEN_RETRY_MINUTES, REVIEW_INTERVALS, scheduleAfterAttempt, scheduleAfterReview } from "./progress";

describe("spaced repetition schedule", () => {
  it("uses the agreed 1-3-7-14 day intervals", () => expect(REVIEW_INTERVALS).toEqual([1, 3, 7, 14]));
  it("does not mutate the input date", () => { const date = new Date("2026-07-17T00:00:00Z"); const next = addDays(date, 3); expect(next.toISOString()).toBe("2026-07-20T00:00:00.000Z"); expect(date.toISOString()).toBe("2026-07-17T00:00:00.000Z"); });
  it("repeats a forgotten item after 10 minutes", () => {
    const now = new Date("2026-07-17T00:00:00Z");
    expect(FORGOTTEN_RETRY_MINUTES).toBe(10);
    expect(addMinutes(now, 10).toISOString()).toBe("2026-07-17T00:10:00.000Z");
    expect(scheduleAfterAttempt(now, false).dueAt.toISOString()).toBe("2026-07-17T00:10:00.000Z");
    expect(scheduleAfterReview(now, false, 2).dueAt.toISOString()).toBe("2026-07-17T00:10:00.000Z");
  });
  it("moves a remembered item through the spaced schedule", () => {
    const now = new Date("2026-07-17T00:00:00Z");
    expect(scheduleAfterAttempt(now, true).dueAt.toISOString()).toBe("2026-07-18T00:00:00.000Z");
    expect(scheduleAfterReview(now, true, 0)).toEqual({ intervalIndex: 1, dueAt: new Date("2026-07-20T00:00:00Z") });
  });
});

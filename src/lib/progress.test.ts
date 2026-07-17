import { describe, expect, it } from "vitest";
import { addDays, REVIEW_INTERVALS } from "./progress";

describe("spaced repetition schedule", () => {
  it("uses the agreed 1-3-7-14 day intervals", () => expect(REVIEW_INTERVALS).toEqual([1, 3, 7, 14]));
  it("does not mutate the input date", () => { const date = new Date("2026-07-17T00:00:00Z"); const next = addDays(date, 3); expect(next.toISOString()).toBe("2026-07-20T00:00:00.000Z"); expect(date.toISOString()).toBe("2026-07-17T00:00:00.000Z"); });
});

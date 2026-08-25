import { describe, expect, it } from "vitest";
import { buildMatchingOrder } from "./matching-order";

const pairs = [
  { left: "mum", right: "mẹ" },
  { left: "dad", right: "bố" },
  { left: "grandma", right: "bà" },
  { left: "grandpa", right: "ông" },
];

describe("matching order", () => {
  it("does not preserve the learned word order", () => {
    const { rows } = buildMatchingOrder(pairs, "activity-family");
    expect(rows.map((pair) => pair.left)).not.toEqual(pairs.map((pair) => pair.left));
  });

  it("never places a row's correct meaning at the same visual position", () => {
    const { rows, meanings } = buildMatchingOrder(pairs, "activity-family");
    expect(rows.every((pair, index) => pair.right !== meanings[index])).toBe(true);
  });

  it("keeps the order stable while the learner answers", () => {
    expect(buildMatchingOrder(pairs, "activity-family")).toEqual(buildMatchingOrder(pairs, "activity-family"));
  });
});

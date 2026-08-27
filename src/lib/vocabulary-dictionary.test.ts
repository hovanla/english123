import { describe, expect, it } from "vitest";
import definitions from "@/data/vocabulary-definitions.json";
import { getVocabularyDefinition } from "./vocabulary-dictionary";

describe("curated vocabulary dictionary", () => {
  it("contains one definition for every distinct vocabulary sense", () => {
    expect(definitions).toHaveLength(2_267);
    expect(definitions.every((entry) => entry.definition.trim().length > 0)).toBe(true);
  });

  it("uses the Vietnamese meaning to distinguish senses of the same word", () => {
    expect(getVocabularyDefinition("book", "quyển sách"))
      .toBe("Collection of printed pages telling stories or information.");
    expect(getVocabularyDefinition("book", "đặt chỗ"))
      .toBe("To reserve a seat or room in advance.");
  });

  it("normalizes case and surrounding spaces when looking up a definition", () => {
    expect(getVocabularyDefinition("  BOOK ", " Quyển sách "))
      .toBe(getVocabularyDefinition("book", "quyển sách"));
  });

  it("returns an empty string for a vocabulary sense that is not curated", () => {
    expect(getVocabularyDefinition("not-a-real-entry", "không tồn tại")).toBe("");
  });
});

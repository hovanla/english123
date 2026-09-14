import { describe, expect, it } from "vitest";
import { pronunciationLessons } from "./pronunciation-course";
describe("American pronunciation curriculum", () => {
  it("covers every consonant in the chosen American inventory", () => {
    const symbols = pronunciationLessons.filter((l) => l.group === "Phụ âm").map((l) => l.symbol);
    expect(new Set(symbols)).toEqual(new Set(["p", "b", "t", "d", "k", "ɡ", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "tʃ", "dʒ", "h", "m", "n", "ŋ", "l", "ɹ", "w", "j"]));
  });
  it("covers vowels, diphthongs and rhotic vowels", () => {
    const symbols = new Set(pronunciationLessons.map((l) => l.symbol));
    for (const sound of ["i", "ɪ", "ɛ", "æ", "ɑ", "ɔ", "ʊ", "u", "ʌ", "ə", "eɪ", "aɪ", "ɔɪ", "oʊ", "aʊ", "ɝ", "ɚ"]) expect(symbols.has(sound)).toBe(true);
  });
  it("has unique persistent ids and usable practice content", () => {
    expect(new Set(pronunciationLessons.map((l) => l.id)).size).toBe(pronunciationLessons.length);
    for (const lesson of pronunciationLessons) {
      expect(lesson.words.length).toBeGreaterThanOrEqual(4);
      expect(lesson.tip.length).toBeGreaterThan(40);
      expect(lesson.sentence.length).toBeGreaterThan(10);
      expect([0, 2]).toContain(lesson.pair.length);
    }
  });
});

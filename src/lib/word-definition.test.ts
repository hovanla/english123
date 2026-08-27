import { describe, expect, it } from "vitest";
import { buildWordDefinitionPrompt, extractPublicDictionaryDefinition, normalizeWordDefinition } from "./word-definition";

describe("word definition", () => {
  it("keeps the requested vocabulary sense in the prompt", () => {
    const prompt = buildWordDefinitionPrompt("address", "xưng hô");
    expect(prompt).toContain('"address"');
    expect(prompt).toContain('"xưng hô"');
    expect(prompt).toContain("Use only English");
  });

  it("cleans a short dictionary response", () => {
    expect(normalizeWordDefinition('Definition: "To speak to someone using a particular name or title"'))
      .toBe("To speak to someone using a particular name or title.");
  });

  it("expands a one-word synonym into an explanatory sentence", () => {
    expect(normalizeWordDefinition("Mother.")).toBe("A common English word or expression for “mother”.");
  });

  it("reads the first definition from the public dictionary response", () => {
    expect(extractPublicDictionaryDefinition([{ meanings: [{ definitions: [{ definition: "A person's mother." }] }] }]))
      .toBe("A common English word or expression for “a person's mother”.");
  });
});

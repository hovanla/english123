export function vocabularyDefinitionKey(word: string, vietnameseMeaning: string) {
  return `${word.normalize("NFKC").trim().toLowerCase()}\u241f${vietnameseMeaning.normalize("NFKC").trim().toLowerCase()}`;
}

export function buildWordDefinitionPrompt(word: string, vietnameseMeaning: string) {
  return `Write exactly one learner-friendly English dictionary definition for the vocabulary below.

Target expression: ${JSON.stringify(word)}
Intended Vietnamese sense: ${JSON.stringify(vietnameseMeaning)}

Rules:
- Use only English in the definition.
- Use 7 to 20 simple words.
- Match the intended sense, not another meaning of the word.
- Do not begin with the target expression.
- Return only the definition and end it with a period.`;
}

export function normalizeWordDefinition(value: string) {
  const cleaned = value
    .replace(/^\s*(?:definition|meaning)\s*:\s*/i, "")
    .replace(/^["'“”]+|["'“”]+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
  if (!cleaned) return "";
  if (cleaned.split(/\s+/).length < 5) {
    return `A common English word or expression for “${cleaned.replace(/[.!?]+$/, "").toLowerCase()}”.`;
  }
  return /[.!?]$/.test(cleaned) ? cleaned : `${cleaned}.`;
}

export function extractPublicDictionaryDefinition(payload: unknown) {
  if (!Array.isArray(payload)) return "";
  for (const entry of payload) {
    if (!entry || typeof entry !== "object") continue;
    const meanings = (entry as { meanings?: unknown }).meanings;
    if (!Array.isArray(meanings)) continue;
    for (const meaning of meanings) {
      if (!meaning || typeof meaning !== "object") continue;
      const definitions = (meaning as { definitions?: unknown }).definitions;
      if (!Array.isArray(definitions)) continue;
      for (const item of definitions) {
        const definition = item && typeof item === "object" ? (item as { definition?: unknown }).definition : "";
        if (typeof definition === "string" && definition.trim()) return normalizeWordDefinition(definition);
      }
    }
  }
  return "";
}

import definitions from "@/data/vocabulary-definitions.json";
import { vocabularyDefinitionKey } from "@/lib/word-definition";

type VocabularyDefinition = { word: string; meaning: string; definition: string };

const exactDefinitionMap = new Map(
  (definitions as VocabularyDefinition[]).map((entry) => [vocabularyDefinitionKey(entry.word, entry.meaning), entry.definition]),
);

function normalizeLoose(value: string) {
  return value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\([^)]*\)|\[[^\]]*\]/g, " ")
    .replace(/[.,!?;:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const looseDefinitionMap = new Map<string, string>();
const definitionsByWord = new Map<string, Set<string>>();

for (const entry of definitions as VocabularyDefinition[]) {
  const looseKey = vocabularyDefinitionKey(normalizeLoose(entry.word), normalizeLoose(entry.meaning));
  const existing = looseDefinitionMap.get(looseKey);
  if (!existing || existing === entry.definition) looseDefinitionMap.set(looseKey, entry.definition);

  const wordKey = normalizeLoose(entry.word);
  const wordDefinitions = definitionsByWord.get(wordKey) || new Set<string>();
  wordDefinitions.add(entry.definition);
  definitionsByWord.set(wordKey, wordDefinitions);
}

export function getVocabularyDefinition(word: string, meaning: string) {
  const exact = exactDefinitionMap.get(vocabularyDefinitionKey(word, meaning));
  if (exact) return exact;

  const loose = looseDefinitionMap.get(vocabularyDefinitionKey(normalizeLoose(word), normalizeLoose(meaning)));
  if (loose) return loose;

  const definitionsForWord = definitionsByWord.get(normalizeLoose(word));
  return definitionsForWord?.size === 1 ? [...definitionsForWord][0] : "";
}

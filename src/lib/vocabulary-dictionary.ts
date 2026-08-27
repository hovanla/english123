import definitions from "@/data/vocabulary-definitions.json";
import { vocabularyDefinitionKey } from "@/lib/word-definition";

type VocabularyDefinition = { word: string; meaning: string; definition: string };

const definitionMap = new Map(
  (definitions as VocabularyDefinition[]).map((entry) => [vocabularyDefinitionKey(entry.word, entry.meaning), entry.definition]),
);

export function getVocabularyDefinition(word: string, meaning: string) {
  return definitionMap.get(vocabularyDefinitionKey(word, meaning)) || "";
}

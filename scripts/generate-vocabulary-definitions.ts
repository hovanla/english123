import "dotenv/config";
import { promises as fs } from "node:fs";
import path from "node:path";
import { advancedEnglishUnits } from "../src/lib/advanced-english-content";
import { basicCommunicationUnits } from "../src/lib/basic-communication-content";
import { basicEnglishUnits } from "../src/lib/basic-english-content";
import { basicEnglishTwoUnits } from "../src/lib/basic-english-two-content";
import { beginnerConversationUnits } from "../src/lib/beginner-conversation-content";
import { gradeEightUnits } from "../src/lib/grade-eight-content";
import { gradeElevenUnits } from "../src/lib/grade-eleven-content";
import { gradeFiveUnits } from "../src/lib/grade-five-content";
import { gradeFourUnits } from "../src/lib/grade-four-content";
import { gradeNineUnits } from "../src/lib/grade-nine-content";
import { gradeOneUnits } from "../src/lib/grade-one-content";
import { gradeSevenUnits } from "../src/lib/grade-seven-content";
import { gradeSixUnits } from "../src/lib/grade-six-content";
import { gradeTenUnits } from "../src/lib/grade-ten-content";
import { gradeThreeUnits } from "../src/lib/grade-three-content";
import { gradeTwelveUnits } from "../src/lib/grade-twelve-content";
import { gradeTwoUnits } from "../src/lib/grade-two-content";
import { getPreschoolScene } from "../src/lib/preschool-content";
import { normalizeWordDefinition, vocabularyDefinitionKey } from "../src/lib/word-definition";

type Level = "starter" | "beginner" | "elementary" | "intermediate";
type UnitWithWords = { words: Array<[string, string]> };
type DefinitionEntry = { word: string; meaning: string; definition: string };
type Sense = { word: string; meaning: string; level: Level };

const dataPath = path.join(process.cwd(), "src", "data", "vocabulary-definitions.json");
const preschoolSlugs = ["hello", "family", "school", "feelings", "toys", "colors", "body", "face", "shapes", "clothes", "fruit", "drinks", "snacks", "in-the-room", "at-home", "i-can", "pets", "the-farm", "the-zoo", "the-park"];
const levelRank: Record<Level, number> = { starter: 0, beginner: 1, elementary: 2, intermediate: 3 };
const preschoolUnits = preschoolSlugs.map((slug) => getPreschoolScene(slug)).filter((unit): unit is NonNullable<typeof unit> => Boolean(unit));

const groups: Array<{ level: Level; units: UnitWithWords[] }> = [
  { level: "starter", units: [...preschoolUnits, ...gradeOneUnits, ...gradeTwoUnits] },
  { level: "beginner", units: [...gradeThreeUnits, ...gradeFourUnits, ...gradeFiveUnits] },
  { level: "elementary", units: [...gradeSixUnits, ...gradeSevenUnits, ...gradeEightUnits, ...gradeNineUnits, ...beginnerConversationUnits] },
  { level: "intermediate", units: [...gradeTenUnits, ...gradeElevenUnits, ...gradeTwelveUnits, ...basicEnglishUnits, ...basicEnglishTwoUnits, ...advancedEnglishUnits, ...basicCommunicationUnits] },
];

function allSenses() {
  const senses = new Map<string, Sense>();
  for (const group of groups) {
    for (const unit of group.units) {
      for (const [word, meaning] of unit.words) {
        const key = vocabularyDefinitionKey(word, meaning);
        const current = senses.get(key);
        if (!current || levelRank[group.level] < levelRank[current.level]) senses.set(key, { word, meaning, level: group.level });
      }
    }
  }
  return [...senses.values()];
}

function extractAssistantText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices)) return "";
  const message = choices[0] && typeof choices[0] === "object" ? (choices[0] as { message?: unknown }).message : null;
  return message && typeof message === "object" && typeof (message as { content?: unknown }).content === "string"
    ? (message as { content: string }).content
    : "";
}

function parseDefinitionBatch(text: string) {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start < 0 || end <= start) return [];
  try {
    const parsed = JSON.parse(text.slice(start, end + 1));
    return Array.isArray(parsed) ? parsed as Array<{ id?: unknown; definition?: unknown }> : [];
  } catch {
    return [];
  }
}

function cleanDefinition(word: string, value: string) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const withoutHeadword = value
    .replace(/\*\*/g, "")
    .replace(new RegExp(`^${escaped}\\s*(?:[-–—:]|means\\b)\\s*`, "i"), "")
    .trim();
  const definition = normalizeWordDefinition(withoutHeadword);
  const wordCount = definition.split(/\s+/).filter(Boolean).length;
  return wordCount >= 5 && wordCount <= 32 ? definition : "";
}

async function requestBatch(batch: Sense[]) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA_API_KEY is required to generate the curated dictionary.");
  const items = batch.map((sense, id) => ({ id, word: sense.word, intendedVietnameseSense: sense.meaning, learnerLevel: sense.level }));
  const response = await fetch(`${(process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.NVIDIA_MODEL || "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: "You write original learner-dictionary definitions. Never copy or quote a named dictionary. Return valid JSON only." },
        { role: "user", content: `Write one original English-English definition for every item in this JSON array:\n${JSON.stringify(items)}\n\nRules:\n- Return exactly a JSON array of objects with keys id and definition.\n- Preserve every numeric id.\n- Match the intended Vietnamese sense precisely.\n- Use only English in each definition.\n- Write one complete sentence of 7-20 simple words.\n- Use easier words for starter/beginner levels.\n- Do not define a word by repeating the same word or expression.\n- Do not include examples, translations, markdown, labels, or dictionary names.` },
      ],
      temperature: 0.2,
      top_p: 0.9,
      max_tokens: 4096,
      stream: false,
    }),
    signal: AbortSignal.timeout(90_000),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`NVIDIA request failed with status ${response.status}`);
  return parseDefinitionBatch(extractAssistantText(payload));
}

async function save(entries: Map<string, DefinitionEntry>) {
  const sorted = [...entries.values()].sort((a, b) => a.word.localeCompare(b.word, "en") || a.meaning.localeCompare(b.meaning, "vi"));
  await fs.writeFile(dataPath, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

async function main() {
  const existing = JSON.parse(await fs.readFile(dataPath, "utf8")) as DefinitionEntry[];
  const entries = new Map(existing.map((entry) => [vocabularyDefinitionKey(entry.word, entry.meaning), entry]));
  const senses = allSenses();
  let pending = senses.filter((sense) => !entries.has(vocabularyDefinitionKey(sense.word, sense.meaning)));
  console.log(`Vocabulary senses: ${senses.length}; already curated: ${entries.size}; missing: ${pending.length}.`);

  for (let attempt = 1; attempt <= 3 && pending.length; attempt += 1) {
    const retry: Sense[] = [];
    for (let offset = 0; offset < pending.length; offset += 240) {
      const wave = pending.slice(offset, offset + 240);
      const batches = Array.from({ length: Math.ceil(wave.length / 30) }, (_, index) => wave.slice(index * 30, index * 30 + 30));
      const results = await Promise.allSettled(batches.map((batch) => requestBatch(batch)));
      for (const [batchIndex, result] of results.entries()) {
        const batch = batches[batchIndex];
        if (result.status === "rejected") {
          console.warn(result.reason instanceof Error ? result.reason.message : "Definition batch failed.");
          retry.push(...batch);
          continue;
        }
        const byId = new Map(result.value.map((item) => [Number(item.id), typeof item.definition === "string" ? item.definition : ""]));
        for (const [id, sense] of batch.entries()) {
          const definition = cleanDefinition(sense.word, byId.get(id) || "");
          if (!definition) retry.push(sense);
          else entries.set(vocabularyDefinitionKey(sense.word, sense.meaning), { word: sense.word, meaning: sense.meaning, definition });
        }
      }
      await save(entries);
      console.log(`Attempt ${attempt}: ${Math.min(offset + wave.length, pending.length)}/${pending.length}; saved ${entries.size}/${senses.length}.`);
    }
    pending = retry;
  }

  await save(entries);
  if (pending.length) throw new Error(`${pending.length} definitions could not be generated. Run the command again to resume.`);
  console.log(`Completed ${entries.size} curated vocabulary definitions.`);
}

void main();

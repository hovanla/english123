import "dotenv/config";
import { promises as fs } from "node:fs";
import path from "node:path";
import definitions from "../src/data/vocabulary-definitions.json";
import { normalizeWordDefinition, vocabularyDefinitionKey } from "../src/lib/word-definition";

type Entry = { word: string; meaning: string; definition: string };
const dataPath = path.join(process.cwd(), "src", "data", "vocabulary-definitions.json");
const progressPath = path.join(process.cwd(), ".definition-review-progress.json");

function extractText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices)) return "";
  const message = choices[0] && typeof choices[0] === "object" ? (choices[0] as { message?: unknown }).message : null;
  return message && typeof message === "object" && typeof (message as { content?: unknown }).content === "string"
    ? (message as { content: string }).content
    : "";
}

function parseCorrections(text: string) {
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

function clean(word: string, value: string) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const definition = normalizeWordDefinition(value.replace(/\*\*/g, "").replace(new RegExp(`^${escaped}\\s*(?:[-–—:]|means\\b)\\s*`, "i"), "").trim());
  const count = definition.split(/\s+/).filter(Boolean).length;
  return count >= 5 && count <= 32 ? definition : "";
}

async function reviewBatch(batch: Entry[]) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA_API_KEY is required.");
  const items = batch.map((entry, id) => ({ id, word: entry.word, intendedVietnameseSense: entry.meaning, currentDefinition: entry.definition }));
  const response = await fetch(`${(process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.NVIDIA_MODEL || "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: "You are the senior editor of an original English learner's dictionary. Return valid JSON only. Never quote or copy a named dictionary." },
        { role: "user", content: `Review these original learner definitions:\n${JSON.stringify(items)}\n\nReturn a JSON array containing ONLY definitions that must be corrected. Use objects with numeric id and definition. Return [] when all are good. Correct a definition when it has the wrong sense or part of speech, unnatural grammar, is circular, vague, misleading, or too difficult. Each correction must:\n- match the intended Vietnamese sense exactly;\n- use only English;\n- be one natural sentence of 7-20 simple words;\n- not repeat the target expression as its own definition;\n- contain no examples, translations, labels, markdown, or dictionary names.` },
      ],
      temperature: 0.1,
      top_p: 0.9,
      max_tokens: 4096,
      stream: false,
    }),
    signal: AbortSignal.timeout(180_000),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`Review failed with status ${response.status}`);
  return parseCorrections(extractText(payload));
}

async function save(entries: Entry[]) {
  await fs.writeFile(dataPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
}

async function main() {
  const entries = [...definitions] as Entry[];
  const entryByKey = new Map(entries.map((entry) => [vocabularyDefinitionKey(entry.word, entry.meaning), entry]));
  const progress: { offset?: number; revised?: number } = await fs.readFile(progressPath, "utf8").then((value) => JSON.parse(value)).catch(() => ({}));
  let revised = progress.revised || 0;
  const startOffset = progress.offset || 0;
  for (let offset = startOffset; offset < entries.length; offset += 320) {
    const wave = entries.slice(offset, offset + 320);
    const batches = Array.from({ length: Math.ceil(wave.length / 40) }, (_, index) => wave.slice(index * 40, index * 40 + 40));
    const results = await Promise.allSettled(batches.map((batch) => reviewBatch(batch)));
    for (const [batchIndex, settled] of results.entries()) {
      let result = settled;
      if (result.status === "rejected") {
        console.warn(result.reason instanceof Error ? result.reason.message : "Review batch failed; retrying.");
        result = { status: "fulfilled", value: await reviewBatch(batches[batchIndex]) };
      }
      const batch = batches[batchIndex];
      for (const correction of result.value) {
        const source = batch[Number(correction.id)];
        if (!source || typeof correction.definition !== "string") continue;
        const definition = clean(source.word, correction.definition);
        if (!definition) continue;
        const entry = entryByKey.get(vocabularyDefinitionKey(source.word, source.meaning));
        if (entry && entry.definition !== definition) {
          entry.definition = definition;
          revised += 1;
        }
      }
    }
    await save(entries);
    await fs.writeFile(progressPath, JSON.stringify({ offset: offset + wave.length, revised }), "utf8");
    console.log(`Reviewed ${Math.min(offset + wave.length, entries.length)}/${entries.length}; revised ${revised}.`);
  }
  await fs.unlink(progressPath).catch(() => undefined);
  console.log(`Semantic review completed; revised ${revised} definitions.`);
}

void main();

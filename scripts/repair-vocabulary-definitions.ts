import "dotenv/config";
import { promises as fs } from "node:fs";
import path from "node:path";
import definitions from "../src/data/vocabulary-definitions.json";
import { normalizeWordDefinition, vocabularyDefinitionKey } from "../src/lib/word-definition";

type Entry = { word: string; meaning: string; definition: string };
const dataPath = path.join(process.cwd(), "src", "data", "vocabulary-definitions.json");

const manualDefinitions = new Map<string, string>([
  ["America|nước Mỹ", "The country also known as the United States."],
  ["brave|dũng cảm", "Able to face danger or difficulty without being controlled by fear."],
  ["clever|thông minh", "Able to learn, understand, or solve problems quickly."],
  ["graduate|tốt nghiệp", "To finish a course at a school, college, or university."],
  ["hard-working|chăm chỉ", "Willing to spend a lot of time and effort on work."],
  ["honest|trung thực", "Always telling the truth and not trying to deceive people."],
  ["kind|tốt bụng", "Caring about other people and wanting to help them."],
  ["large|rộng lớn", "Covering a big area or taking up a lot of space."],
  ["lazy|lười biếng", "Not willing to work or use much effort."],
  ["quiet|ít nói", "Not talking much or making much noise."],
  ["responsible|có trách nhiệm", "Having a duty to care for something and make good decisions."],
  ["supportive|biết hỗ trợ", "Giving help and encouragement to someone who needs it."],
  ["talkative|hay nói", "Liking to talk a lot in conversations."],
  ["tenth|thứ mười", "Coming after ninth in a sequence or order."],
  ["volunteer|tình nguyện", "To offer to do something without being paid."],
]);

function containsHeadword(entry: Entry) {
  const escaped = entry.word.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped ? new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, "i").test(entry.definition) : false;
}

function needsRewrite(entry: Entry) {
  return containsHeadword(entry) || /a common english word or expression for/i.test(entry.definition);
}

function extractText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices)) return "";
  const message = choices[0] && typeof choices[0] === "object" ? (choices[0] as { message?: unknown }).message : null;
  return message && typeof message === "object" && typeof (message as { content?: unknown }).content === "string"
    ? (message as { content: string }).content
    : "";
}

function parseDefinitions(text: string) {
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

async function rewriteBatch(batch: Entry[]) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA_API_KEY is required.");
  const response = await fetch(`${(process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.NVIDIA_MODEL || "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: "You edit an original learner's dictionary. Return valid JSON only. Never quote or copy another dictionary." },
        { role: "user", content: `Rewrite EVERY definition below.\n${JSON.stringify(batch.map((entry, id) => ({ id, word: entry.word, intendedVietnameseSense: entry.meaning, currentDefinition: entry.definition })))}\n\nReturn one JSON object per item in the form {\"id\":0,\"definition\":\"...\"}. Rules:\n- Match the Vietnamese sense and part of speech exactly.\n- Use one natural English sentence of 7-20 simple words.\n- Never use or repeat the target word or expression anywhere in its definition.\n- Do not use translations, examples, labels, markdown, quotation marks, or dictionary names.\n- Begin with a capital letter and end with a full stop.` },
      ],
      temperature: 0.1,
      top_p: 0.9,
      max_tokens: 4096,
      stream: false,
    }),
    signal: AbortSignal.timeout(180_000),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`Repair failed with status ${response.status}`);
  return parseDefinitions(extractText(payload));
}

function clean(entry: Entry, value: string) {
  const definition = normalizeWordDefinition(value.replace(/\*\*/g, "").trim());
  const candidate = { ...entry, definition };
  const count = definition.split(/\s+/).filter(Boolean).length;
  return count >= 5 && count <= 32 && !needsRewrite(candidate) ? definition : "";
}

async function main() {
  const entries = [...definitions] as Entry[];

  for (const entry of entries) {
    const manual = manualDefinitions.get(`${entry.word}|${entry.meaning}`);
    if (manual) entry.definition = manual;
    if (/^[a-z]/.test(entry.definition)) {
      entry.definition = `${entry.definition[0].toUpperCase()}${entry.definition.slice(1)}`;
    }
  }

  for (let pass = 1; pass <= 3; pass += 1) {
    const suspects = entries.filter(needsRewrite);
    if (!suspects.length) break;
    console.log(`Repair pass ${pass}: ${suspects.length} definitions.`);
    const batches = Array.from({ length: Math.ceil(suspects.length / 30) }, (_, index) => suspects.slice(index * 30, index * 30 + 30));
    const results = await Promise.all(batches.map((batch) => rewriteBatch(batch)));
    for (const [batchIndex, result] of results.entries()) {
      const batch = batches[batchIndex];
      for (const correction of result) {
        const entry = batch[Number(correction.id)];
        if (!entry || typeof correction.definition !== "string") continue;
        const definition = clean(entry, correction.definition);
        if (definition) entry.definition = definition;
      }
    }
    await fs.writeFile(dataPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  }

  const unresolved = entries.filter(needsRewrite);
  if (unresolved.length) {
    await fs.writeFile(dataPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
    throw new Error(`Could not repair ${unresolved.length} circular or generic definitions: ${unresolved.slice(0, 10).map((entry) => vocabularyDefinitionKey(entry.word, entry.meaning)).join(", ")}`);
  }
  await fs.writeFile(dataPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  console.log(`Repaired and saved ${entries.length} definitions.`);
}

void main();

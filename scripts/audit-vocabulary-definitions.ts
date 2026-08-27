import definitions from "../src/data/vocabulary-definitions.json";

const vietnameseCharacters = /[ăâđêôơưàáạảãằắặẳẵầấậẩẫèéẹẻẽềếệểễìíịỉĩòóọỏõồốộổỗờớợởỡùúụủũừứựửữỳýỵỷỹ]/i;
const sentenceCounts = new Map<string, number>();

for (const entry of definitions) {
  sentenceCounts.set(entry.definition, (sentenceCounts.get(entry.definition) || 0) + 1);
}

const badLength = definitions.filter((entry) => {
  const count = entry.definition.trim().split(/\s+/).filter(Boolean).length;
  return count < 5 || count > 32;
});
const containsVietnamese = definitions.filter((entry) => vietnameseCharacters.test(entry.definition));
const repeated = [...sentenceCounts.entries()].filter(([, count]) => count > 3).sort((a, b) => b[1] - a[1]);
const missingPunctuation = definitions.filter((entry) => !/[.!?]$/.test(entry.definition));
const malformed = definitions.filter((entry) => /\*\*|```|^definition\s*:/i.test(entry.definition));
const generic = definitions.filter((entry) => /a common english word or expression for/i.test(entry.definition));
const lowercaseStart = definitions.filter((entry) => /^[a-z]/.test(entry.definition));
const repeatsHeadword = definitions.filter((entry) => {
  const escaped = entry.word.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escaped && new RegExp(`(^|[^a-z])${escaped}([^a-z]|$)`, "i").test(entry.definition);
});

function compact(entries: typeof definitions) {
  return entries.slice(0, 20).map((entry) => `${entry.word} | ${entry.meaning} | ${entry.definition}`);
}

console.log(JSON.stringify({
  count: definitions.length,
  badLength: badLength.length,
  containsVietnamese: containsVietnamese.length,
  missingPunctuation: missingPunctuation.length,
  malformed: malformed.length,
  generic: generic.length,
  lowercaseStart: lowercaseStart.length,
  repeatsHeadword: repeatsHeadword.length,
  repeatedOverThreeTimes: repeated.slice(0, 20),
  genericExamples: compact(generic),
  lowercaseExamples: compact(lowercaseStart),
  repeatedHeadwordExamples: compact(repeatsHeadword),
  samples: definitions.filter((_, index) => index % 227 === 0),
}, null, 2));

if (
  definitions.length !== 2_267
  || badLength.length
  || containsVietnamese.length
  || missingPunctuation.length
  || malformed.length
  || generic.length
  || lowercaseStart.length
  || repeatsHeadword.length
) {
  process.exitCode = 1;
}

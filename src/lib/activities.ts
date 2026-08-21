import { ActivityType, Prisma } from "@prisma/client";
import { z } from "zod";

const optionSchema = z.object({ id: z.string().min(1), text: z.string().min(1) });
const basePrompt = {
  prompt: z.string().min(1),
  explanation: z.string().optional(),
  modelAnswer: z.string().optional(),
  scenario: z.string().optional(),
  visual: z.string().optional(),
  imageUrl: z.string().min(1).optional(),
  imageAlt: z.string().optional(),
  imageHint: z.string().min(1).optional(),
  spriteIndex: z.number().int().min(0).max(24).optional(),
  spriteColumns: z.number().int().min(1).max(5).optional(),
  spriteRows: z.number().int().min(1).max(5).optional(),
  audioUrl: z.string().min(1).optional(),
  audioText: z.string().min(1).optional(),
  mode: z.enum(["VISUAL_GUESS", "AUDIO_GUESS", "RESPONSE_RECALL", "STANDARD"]).optional(),
};

export const activityPayloadSchemas = {
  FLASHCARD: z.object({ ...basePrompt, front: z.string().min(1), back: z.string().min(1), example: z.string().optional() }),
  MULTIPLE_CHOICE: z.object({ ...basePrompt, options: z.array(optionSchema).min(2).max(6), correctOptionId: z.string().min(1) }),
  MATCHING: z.object({ ...basePrompt, pairs: z.array(z.object({ left: z.string().min(1), right: z.string().min(1) })).min(2).max(8) }),
  LISTEN_CHOOSE: z.object({ ...basePrompt, text: z.string().min(1), options: z.array(optionSchema).min(2).max(6), correctOptionId: z.string().min(1) }),
  LISTEN_TYPE: z.object({ ...basePrompt, text: z.string().min(1), acceptedAnswers: z.array(z.string().min(1)).min(1) }),
  SPEAK_REPEAT: z.object({ ...basePrompt, target: z.string().min(1), translation: z.string().optional() }),
  SENTENCE: z.object({
    ...basePrompt,
    target: z.string().min(1),
    translation: z.string().optional(),
    partnerLine: z.string().min(1).optional(),
    acceptedAnswers: z.array(z.string().min(1)).min(1),
    usage: z.string().optional(),
  }),
  SHORT_WRITING: z.object({ ...basePrompt, minWords: z.number().int().min(1).max(200), keywords: z.array(z.string().min(1)).max(20) }),
} satisfies Record<ActivityType, z.ZodType>;

const answerSchemas = {
  FLASHCARD: z.object({ known: z.boolean() }),
  MULTIPLE_CHOICE: z.object({ optionId: z.string().min(1) }),
  MATCHING: z.object({ pairs: z.array(z.object({ left: z.string(), right: z.string() })).min(1) }),
  LISTEN_CHOOSE: z.object({ optionId: z.string().min(1) }),
  LISTEN_TYPE: z.object({ text: z.string().max(500) }),
  SPEAK_REPEAT: z.object({ transcript: z.string().max(500).optional(), confirmed: z.boolean().optional(), unsupported: z.boolean().optional() }),
  SENTENCE: z.object({ text: z.string().max(500) }),
  SHORT_WRITING: z.object({ text: z.string().max(3000) }),
} satisfies Record<ActivityType, z.ZodType>;

export function validateActivityPayload(type: ActivityType, payload: unknown) {
  return activityPayloadSchemas[type].safeParse(payload);
}

export function validateActivityAnswer(type: ActivityType, answer: unknown) {
  return answerSchemas[type].safeParse(answer);
}

export function normalizeAnswer(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function similarity(target: string, actual: string) {
  const expected = new Set(normalizeAnswer(target).split(" ").filter(Boolean));
  const received = new Set(normalizeAnswer(actual).split(" ").filter(Boolean));
  if (!expected.size) return 0;
  return Math.round(([...expected].filter((word) => received.has(word)).length / expected.size) * 100);
}

export function scoreActivity(type: ActivityType, rawPayload: Prisma.JsonValue, rawAnswer: unknown) {
  const payloadResult = validateActivityPayload(type, rawPayload);
  const answerResult = validateActivityAnswer(type, rawAnswer);
  if (!payloadResult.success || !answerResult.success) return { score: 0, passed: false, error: "INVALID_ACTIVITY_DATA" as const };
  const payload = payloadResult.data as Record<string, unknown>;
  const answer = answerResult.data as Record<string, unknown>;
  let score = 0;

  if (type === "FLASHCARD") score = answer.known ? 100 : 0;
  if (type === "MULTIPLE_CHOICE" || type === "LISTEN_CHOOSE") score = answer.optionId === payload.correctOptionId ? 100 : 0;
  if (type === "MATCHING") {
    const expected = payload.pairs as Array<{ left: string; right: string }>;
    const submitted = answer.pairs as Array<{ left: string; right: string }>;
    const correct = expected.filter((pair) => submitted.some((item) => item.left === pair.left && item.right === pair.right)).length;
    score = Math.round((correct / expected.length) * 100);
  }
  if (type === "LISTEN_TYPE" || type === "SENTENCE") {
    const accepted = (payload.acceptedAnswers as string[]) || [];
    score = Math.max(0, ...accepted.map((value) => similarity(value, String(answer.text || ""))));
  }
  if (type === "SPEAK_REPEAT") {
    score = answer.unsupported && answer.confirmed ? 100 : similarity(String(payload.target), String(answer.transcript || ""));
  }
  if (type === "SHORT_WRITING") {
    const text = normalizeAnswer(String(answer.text || ""));
    const words = text.split(" ").filter(Boolean);
    const keywords = (payload.keywords as string[]).map(normalizeAnswer);
    const keywordRatio = keywords.length ? keywords.filter((word) => text.includes(word)).length / keywords.length : 1;
    const lengthRatio = Math.min(words.length / Number(payload.minWords), 1);
    score = Math.round(lengthRatio * 60 + keywordRatio * 40);
  }
  return { score, passed: score >= 70, error: null };
}

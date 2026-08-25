import { z } from "zod";

const feedbackSchema = z.object({
  feedback: z.string().trim().min(1).max(240),
  tip: z.string().trim().min(1).max(240),
});

export type AiPronunciationFeedback = z.infer<typeof feedbackSchema>;

export function buildAiPronunciationPrompt({ target, transcript, score, needsPractice, confidence }: { target: string; transcript: string; score: number; needsPractice: string[]; confidence?: number }) {
  return `The browser has already converted a Vietnamese learner's English speech to text. Give concise, encouraging Vietnamese feedback based only on this recognition result.

Important:
- You did not hear the audio. Never claim to assess accent, mouth position, stress, or individual phonemes.
- Explain whether the recognized words match the target and focus on missing or changed words.
- Do not repeat or request personal information.
- Return only valid JSON with this exact shape: {"feedback":"...","tip":"..."}.

DATA
${JSON.stringify({ target, transcript, score, needsPractice, recognitionConfidence: confidence ?? null })}`;
}

export function parseAiPronunciationFeedback(value: string): AiPronunciationFeedback | null {
  const firstBrace = value.indexOf("{");
  const lastBrace = value.lastIndexOf("}");
  if (firstBrace < 0 || lastBrace <= firstBrace) return null;
  try {
    const parsed = feedbackSchema.safeParse(JSON.parse(value.slice(firstBrace, lastBrace + 1)));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

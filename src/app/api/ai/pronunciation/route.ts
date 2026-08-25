import { ContentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildAiPronunciationPrompt, parseAiPronunciationFeedback } from "@/lib/ai-pronunciation";
import { requestGroqChat, transcribeGroqAudio, validateShortAudio } from "@/lib/groq";
import { getActiveLearner } from "@/lib/learner";
import { assessPronunciation } from "@/lib/pronunciation";
import { prisma } from "@/lib/prisma";
import { extractChatCompletionText, extractResponseText } from "@/lib/unit-tutor";

export const runtime = "nodejs";

const activityIdSchema = z.string().cuid();
const textRequestSchema = z.object({
  activityId: activityIdSchema,
  transcript: z.string().trim().min(1).max(240),
  confidence: z.number().min(0).max(1).optional(),
});

type AiConfig = { provider: "groq" | "nvidia" | "openai"; apiKey: string };

function getAiConfig(): AiConfig | null {
  const preferred = process.env.AI_PROVIDER?.toLowerCase();
  if (preferred === "groq" && process.env.GROQ_API_KEY) return { provider: "groq", apiKey: process.env.GROQ_API_KEY };
  if (preferred === "nvidia" && process.env.NVIDIA_API_KEY) return { provider: "nvidia", apiKey: process.env.NVIDIA_API_KEY };
  if (preferred === "openai" && process.env.OPENAI_API_KEY) return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  if (process.env.GROQ_API_KEY) return { provider: "groq", apiKey: process.env.GROQ_API_KEY };
  if (process.env.NVIDIA_API_KEY) return { provider: "nvidia", apiKey: process.env.NVIDIA_API_KEY };
  if (process.env.OPENAI_API_KEY) return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  return null;
}

async function requestAiFeedback(config: AiConfig, prompt: string) {
  if (config.provider === "groq") {
    const result = await requestGroqChat([
      { role: "system", content: "You are a careful English pronunciation practice assistant. Follow the requested JSON format exactly." },
      { role: "user", content: prompt },
    ], { temperature: 0.2, maxTokens: 220 });
    return result.status >= 200 && result.status < 300 ? parseAiPronunciationFeedback(result.text) : null;
  }

  if (config.provider === "nvidia") {
    const baseUrl = (process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.NVIDIA_MODEL || "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "You are a careful English pronunciation practice assistant. Follow the requested JSON format exactly." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 220,
        stream: false,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return null;
    return parseAiPronunciationFeedback(extractChatCompletionText(await response.json().catch(() => null)));
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.6",
      store: false,
      reasoning: { effort: "low" },
      text: { verbosity: "low" },
      max_output_tokens: 180,
      instructions: "Return only the JSON object requested by the user prompt.",
      input: prompt,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) return null;
  return parseAiPronunciationFeedback(extractResponseText(await response.json().catch(() => null)));
}

export async function POST(request: Request) {
  const learner = await getActiveLearner();
  const isAudioRequest = request.headers.get("content-type")?.includes("multipart/form-data") ?? false;
  let activityId = "";
  let transcript = "";
  let confidence: number | undefined;
  let recognizer: "browser" | "groq-whisper" = "browser";
  let audio: File | null = null;

  if (isAudioRequest) {
    const form = await request.formData().catch(() => null);
    const parsedActivityId = activityIdSchema.safeParse(form?.get("activityId"));
    const candidateAudio = form?.get("audio") ?? null;
    if (!parsedActivityId.success || !validateShortAudio(candidateAudio)) {
      return NextResponse.json({ error: "INVALID_AUDIO_INPUT" }, { status: 400 });
    }
    activityId = parsedActivityId.data;
    audio = candidateAudio;
    recognizer = "groq-whisper";
  } else {
    const parsed = textRequestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
    activityId = parsed.data.activityId;
    transcript = parsed.data.transcript;
    confidence = parsed.data.confidence;
  }

  const activity = await prisma.activity.findFirst({
    where: {
      id: activityId,
      status: ContentStatus.PUBLISHED,
      lesson: { status: ContentStatus.PUBLISHED, unit: { status: ContentStatus.PUBLISHED, course: { status: ContentStatus.PUBLISHED } } },
    },
    select: { id: true, payload: true },
  });
  if (!activity || typeof activity.payload !== "object" || activity.payload === null || Array.isArray(activity.payload)) {
    return NextResponse.json({ error: "ACTIVITY_NOT_FOUND" }, { status: 404 });
  }
  const payload = activity.payload as Record<string, unknown>;
  const target = typeof payload.target === "string" ? payload.target : "";
  if (!target) return NextResponse.json({ error: "PRONUNCIATION_NOT_SUPPORTED" }, { status: 400 });

  if (audio) {
    try {
      const result = await transcribeGroqAudio(audio);
      if (result.status === 503) return NextResponse.json({ error: "GROQ_NOT_CONFIGURED" }, { status: 503 });
      if (result.status === 429) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
      if (result.status < 200 || result.status >= 300 || !result.transcript) {
        return NextResponse.json({ error: "SPEECH_NOT_RECOGNIZED" }, { status: 422 });
      }
      transcript = result.transcript;
    } catch {
      return NextResponse.json({ error: "SPEECH_SERVICE_UNAVAILABLE" }, { status: 502 });
    }
  }

  const local = assessPronunciation(target, transcript);
  const config = getAiConfig();
  let aiFeedback = null;
  if (config) {
    try {
      aiFeedback = await requestAiFeedback(config, buildAiPronunciationPrompt({
        target,
        transcript,
        score: local.score,
        needsPractice: local.needsPractice,
        confidence,
        recognizer,
      }));
    } catch {
      aiFeedback = null;
    }
  }

  await prisma.productEvent.create({
    data: {
      learnerProfileId: learner.id,
      name: "pronunciation_checked",
      entityType: "Activity",
      entityId: activity.id,
      metadata: { score: local.score, ai: Boolean(aiFeedback), provider: aiFeedback ? config?.provider : "local", recognizer },
    },
  });

  return NextResponse.json({
    ...local,
    passed: local.score >= 70,
    target,
    transcript,
    confidence,
    recognizer,
    feedback: aiFeedback?.feedback || local.message,
    tip: aiFeedback?.tip || (local.needsPractice.length ? `Nghe lại và đọc rõ: ${local.needsPractice.join(", ")}.` : "Giữ tốc độ chậm và đều rồi nói lại một lần nữa."),
    source: aiFeedback ? config?.provider : "local",
  });
}

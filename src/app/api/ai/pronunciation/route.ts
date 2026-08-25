import { ContentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildAiPronunciationPrompt, parseAiPronunciationFeedback } from "@/lib/ai-pronunciation";
import { getActiveLearner } from "@/lib/learner";
import { assessPronunciation } from "@/lib/pronunciation";
import { prisma } from "@/lib/prisma";
import { extractChatCompletionText, extractResponseText } from "@/lib/unit-tutor";

export const runtime = "nodejs";

const requestSchema = z.object({
  activityId: z.string().cuid(),
  transcript: z.string().trim().min(1).max(240),
  confidence: z.number().min(0).max(1).optional(),
});

type AiConfig = { provider: "nvidia" | "openai"; apiKey: string };

function getAiConfig(): AiConfig | null {
  const preferred = process.env.AI_PROVIDER?.toLowerCase();
  if (preferred === "nvidia" && process.env.NVIDIA_API_KEY) return { provider: "nvidia", apiKey: process.env.NVIDIA_API_KEY };
  if (preferred === "openai" && process.env.OPENAI_API_KEY) return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  if (process.env.NVIDIA_API_KEY) return { provider: "nvidia", apiKey: process.env.NVIDIA_API_KEY };
  if (process.env.OPENAI_API_KEY) return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  return null;
}

async function requestAiFeedback(config: AiConfig, prompt: string) {
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
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });

  const activity = await prisma.activity.findFirst({
    where: {
      id: parsed.data.activityId,
      status: ContentStatus.PUBLISHED,
      lesson: { status: ContentStatus.PUBLISHED, unit: { status: ContentStatus.PUBLISHED, course: { status: ContentStatus.PUBLISHED } } },
    },
    select: { id: true, payload: true },
  });
  if (!activity || typeof activity.payload !== "object" || activity.payload === null || Array.isArray(activity.payload)) {
    return NextResponse.json({ error: "ACTIVITY_NOT_FOUND" }, { status: 404 });
  }
  const target = typeof activity.payload.target === "string" ? activity.payload.target : "";
  if (!target) return NextResponse.json({ error: "PRONUNCIATION_NOT_SUPPORTED" }, { status: 400 });

  const local = assessPronunciation(target, parsed.data.transcript);
  const config = getAiConfig();
  let aiFeedback = null;
  if (config) {
    try {
      aiFeedback = await requestAiFeedback(config, buildAiPronunciationPrompt({
        target,
        transcript: parsed.data.transcript,
        score: local.score,
        needsPractice: local.needsPractice,
        confidence: parsed.data.confidence,
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
      metadata: { score: local.score, ai: Boolean(aiFeedback), provider: aiFeedback ? config?.provider : "local" },
    },
  });

  return NextResponse.json({
    ...local,
    passed: local.score >= 70,
    transcript: parsed.data.transcript,
    confidence: parsed.data.confidence,
    feedback: aiFeedback?.feedback || local.message,
    tip: aiFeedback?.tip || (local.needsPractice.length ? `Nghe lại và đọc rõ: ${local.needsPractice.join(", ")}.` : "Giữ tốc độ chậm và đều rồi nói lại một lần nữa."),
    source: aiFeedback ? config?.provider : "local",
  });
}

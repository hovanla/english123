import { createHash } from "node:crypto";
import { ContentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import {
  buildUnitTutorContext,
  buildUnitTutorInstructions,
  containsLikelyPersonalData,
  extractChatCompletionText,
  extractResponseText,
  hasUnsafeSafetyLabel,
} from "@/lib/unit-tutor";

export const runtime = "nodejs";

const historyMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(500),
});
const requestSchema = z.object({
  unitId: z.string().cuid(),
  message: z.string().trim().min(1).max(240),
  history: z.array(historyMessageSchema).max(8).default([]),
});

function safetyIdentifier(learnerId: string) {
  return createHash("sha256").update(`${process.env.AUTH_SECRET || "english123"}:${learnerId}`).digest("hex");
}

async function isFlaggedByOpenAI(apiKey: string, message: string) {
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "omni-moderation-latest", input: message }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error("MODERATION_UNAVAILABLE");
  const payload = await response.json() as { results?: Array<{ flagged?: boolean }> };
  return payload.results?.some((result) => result.flagged) ?? false;
}

function nvidiaBaseUrl() {
  return (process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "");
}

async function isFlaggedByNvidia(apiKey: string, message: string, assistantReply?: string) {
  const messages: Array<{ role: "user" | "assistant"; content: string }> = [{ role: "user", content: message }];
  if (assistantReply) messages.push({ role: "assistant", content: assistantReply });
  const response = await fetch(`${nvidiaBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.NVIDIA_SAFETY_MODEL || "nvidia/nemotron-3.5-content-safety",
      messages,
      temperature: 0.01,
      top_p: 0.95,
      max_tokens: 100,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !extractChatCompletionText(payload)) throw new Error("MODERATION_UNAVAILABLE");
  return hasUnsafeSafetyLabel(payload);
}

type AiConfig = { provider: "nvidia" | "openai"; apiKey: string };

function getAiConfig(): AiConfig | null {
  const preferred = process.env.AI_PROVIDER?.toLowerCase();
  if (preferred === "nvidia" && process.env.NVIDIA_API_KEY) return { provider: "nvidia", apiKey: process.env.NVIDIA_API_KEY };
  if (preferred === "openai" && process.env.OPENAI_API_KEY) return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  if (process.env.NVIDIA_API_KEY) return { provider: "nvidia", apiKey: process.env.NVIDIA_API_KEY };
  if (process.env.OPENAI_API_KEY) return { provider: "openai", apiKey: process.env.OPENAI_API_KEY };
  return null;
}

async function requestNvidiaReply(apiKey: string, instructions: string, history: Array<{ role: "user" | "assistant"; content: string }>) {
  const response = await fetch(`${nvidiaBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.NVIDIA_MODEL || "openai/gpt-oss-20b",
      messages: [{ role: "system", content: instructions }, ...history],
      temperature: 0.6,
      top_p: 0.9,
      max_tokens: 768,
      stream: false,
    }),
    signal: AbortSignal.timeout(30_000),
  });
  const payload = await response.json().catch(() => null);
  return { status: response.status, reply: response.ok ? extractChatCompletionText(payload) : "" };
}

async function requestOpenAiReply(apiKey: string, learnerId: string, instructions: string, history: Array<{ role: "user" | "assistant"; content: string }>) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.6",
      store: false,
      safety_identifier: safetyIdentifier(learnerId),
      reasoning: { effort: "low", context: "current_turn" },
      text: { verbosity: "low" },
      max_output_tokens: 180,
      instructions,
      input: history,
    }),
    signal: AbortSignal.timeout(25_000),
  });
  const payload = await response.json().catch(() => null);
  return { status: response.status, reply: response.ok ? extractResponseText(payload) : "" };
}

export async function POST(request: Request) {
  const learner = await getActiveLearner();
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  if (containsLikelyPersonalData(parsed.data.message)) {
    return NextResponse.json({
      error: "PERSONAL_DATA_NOT_ALLOWED",
      message: "Không gửi email, số điện thoại, địa chỉ hoặc đường dẫn trong phòng luyện nói.",
    }, { status: 400 });
  }

  const ai = getAiConfig();
  if (!ai) return NextResponse.json({ error: "AI_NOT_CONFIGURED" }, { status: 503 });

  const unit = await prisma.unit.findFirst({
    where: {
      id: parsed.data.unitId,
      status: ContentStatus.PUBLISHED,
      course: { status: ContentStatus.PUBLISHED },
    },
    include: {
      course: { include: { grade: true } },
      lessons: {
        where: { status: ContentStatus.PUBLISHED },
        include: { activities: { where: { status: ContentStatus.PUBLISHED }, orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      },
    },
  });
  if (!unit) return NextResponse.json({ error: "UNIT_NOT_FOUND" }, { status: 404 });

  try {
    const inputFlagged = ai.provider === "nvidia"
      ? await isFlaggedByNvidia(ai.apiKey, parsed.data.message)
      : await isFlaggedByOpenAI(ai.apiKey, parsed.data.message);
    if (inputFlagged) {
      return NextResponse.json({
        error: "UNSAFE_MESSAGE",
        message: "Nội dung này không phù hợp với phòng luyện tiếng Anh. Em hãy quay lại chủ đề của unit nhé.",
      }, { status: 400 });
    }

    const history = [...parsed.data.history, { role: "user" as const, content: parsed.data.message }];
    const instructions = buildUnitTutorInstructions(buildUnitTutorContext(unit));
    const result = ai.provider === "nvidia"
      ? await requestNvidiaReply(ai.apiKey, instructions, history)
      : await requestOpenAiReply(ai.apiKey, learner.id, instructions, history);
    if (result.status < 200 || result.status >= 300) {
      return NextResponse.json({ error: "AI_REQUEST_FAILED" }, { status: result.status === 429 ? 429 : 502 });
    }
    const reply = result.reply;
    if (!reply) return NextResponse.json({ error: "AI_EMPTY_RESPONSE" }, { status: 502 });
    if (ai.provider === "nvidia" && await isFlaggedByNvidia(ai.apiKey, parsed.data.message, reply)) {
      return NextResponse.json({ reply: "Let's stay with this English lesson. Please try one short sentence from the unit." });
    }

    await prisma.productEvent.create({
      data: { learnerProfileId: learner.id, name: "unit_ai_chat_turn", entityType: "Unit", entityId: unit.id },
    });
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "AI_UNAVAILABLE" }, { status: 502 });
  }
}

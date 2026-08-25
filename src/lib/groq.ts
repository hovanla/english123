import "server-only";

import { extractChatCompletionText } from "@/lib/unit-tutor";

export type GroqMessage = { role: "system" | "user" | "assistant"; content: string };

export function groqBaseUrl() {
  return (process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");
}

export function groqApiKey() {
  return process.env.GROQ_API_KEY?.trim() || "";
}

export async function requestGroqChat(messages: GroqMessage[], options?: { maxTokens?: number; temperature?: number }) {
  const apiKey = groqApiKey();
  if (!apiKey) return { status: 503, text: "" };
  const response = await fetch(`${groqBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.GROQ_CHAT_MODEL || "openai/gpt-oss-20b",
      messages,
      temperature: options?.temperature ?? 0.5,
      top_p: 0.9,
      max_tokens: options?.maxTokens ?? 500,
      stream: false,
    }),
    signal: AbortSignal.timeout(30_000),
  });
  const payload = await response.json().catch(() => null);
  return { status: response.status, text: response.ok ? extractChatCompletionText(payload) : "" };
}

export async function transcribeGroqAudio(audio: File) {
  const apiKey = groqApiKey();
  if (!apiKey) return { status: 503, transcript: "" };
  const body = new FormData();
  body.append("file", audio, audio.name || "english-practice.webm");
  body.append("model", process.env.GROQ_SPEECH_MODEL || "whisper-large-v3-turbo");
  body.append("language", "en");
  body.append("response_format", "json");
  body.append("temperature", "0");
  const response = await fetch(`${groqBaseUrl()}/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body,
    signal: AbortSignal.timeout(30_000),
  });
  const payload = await response.json().catch(() => null) as { text?: unknown } | null;
  return {
    status: response.status,
    transcript: response.ok && typeof payload?.text === "string" ? payload.text.trim().slice(0, 500) : "",
  };
}

export function validateShortAudio(value: FormDataEntryValue | null): value is File {
  if (!(value instanceof File)) return false;
  const mime = value.type.toLowerCase().split(";")[0];
  const allowed = new Set(["audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav", "video/webm"]);
  return value.size >= 200 && value.size <= 4 * 1024 * 1024 && allowed.has(mime);
}

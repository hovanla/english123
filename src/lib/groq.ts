import "server-only";

import { extractChatCompletionText } from "@/lib/unit-tutor";

export type GroqMessage = { role: "system" | "user" | "assistant"; content: string };
type GroqWorkload = "chat" | "speech";
type KeyState = { chat: number; speech: number };

const cooldowns = new Map<string, KeyState>();
const activeKeyIndex: Record<GroqWorkload, number> = { chat: 0, speech: 0 };

export function groqBaseUrl() {
  return (process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, "");
}

export function groqApiKeys() {
  const values = [process.env.GROQ_API_KEY || "", process.env.GROQ_API_KEYS || ""]
    .join(",")
    .split(/[\n,;]+/)
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Set(values)];
}

function stateFor(apiKey: string) {
  const state = cooldowns.get(apiKey) || { chat: 0, speech: 0 };
  cooldowns.set(apiKey, state);
  return state;
}

function retryAfterSeconds(response: Response) {
  const value = Number.parseFloat(response.headers.get("retry-after") || "");
  return Number.isFinite(value) && value > 0 ? Math.min(Math.ceil(value), 86_400) : 60;
}

function markUnavailable(apiKey: string, workload: GroqWorkload, response: Response) {
  const seconds = response.status === 401 || response.status === 403 ? 86_400 : retryAfterSeconds(response);
  stateFor(apiKey)[workload] = Date.now() + seconds * 1_000;
  return seconds;
}

function remainingCooldown(apiKey: string, workload: GroqWorkload) {
  return Math.max(0, Math.ceil((stateFor(apiKey)[workload] - Date.now()) / 1_000));
}

function orderedKeyCandidates(workload: GroqWorkload) {
  const keys = groqApiKeys();
  if (!keys.length) return [];
  const start = activeKeyIndex[workload] % keys.length;
  return keys.map((_, offset) => {
    const index = (start + offset) % keys.length;
    return { apiKey: keys[index], index };
  });
}

export async function requestGroqChat(messages: GroqMessage[], options?: { maxTokens?: number; temperature?: number; model?: string }) {
  const candidates = orderedKeyCandidates("chat");
  if (!candidates.length) return { status: 503, text: "", retryAfter: 0 };
  let shortestCooldown = 86_400;
  let lastStatus = 502;

  for (const candidate of candidates) {
    const coolingDown = remainingCooldown(candidate.apiKey, "chat");
    if (coolingDown) {
      shortestCooldown = Math.min(shortestCooldown, coolingDown);
      continue;
    }
    try {
      const response = await fetch(`${groqBaseUrl()}/chat/completions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${candidate.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: options?.model || process.env.GROQ_CHAT_MODEL || "openai/gpt-oss-20b",
          messages,
          temperature: options?.temperature ?? 0.5,
          top_p: 0.9,
          max_tokens: options?.maxTokens ?? 500,
          stream: false,
        }),
        signal: AbortSignal.timeout(30_000),
      });
      lastStatus = response.status;
      const payload = await response.json().catch(() => null);
      if (response.status === 429 || response.status === 401 || response.status === 403) {
        shortestCooldown = Math.min(shortestCooldown, markUnavailable(candidate.apiKey, "chat", response));
        activeKeyIndex.chat = (candidate.index + 1) % candidates.length;
        continue;
      }
      if (response.status >= 500) {
        stateFor(candidate.apiKey).chat = Date.now() + 15_000;
        shortestCooldown = Math.min(shortestCooldown, 15);
        activeKeyIndex.chat = (candidate.index + 1) % candidates.length;
        continue;
      }
      activeKeyIndex.chat = candidate.index;
      return { status: response.status, text: response.ok ? extractChatCompletionText(payload) : "", retryAfter: 0 };
    } catch {
      stateFor(candidate.apiKey).chat = Date.now() + 15_000;
      shortestCooldown = Math.min(shortestCooldown, 15);
    }
  }
  return { status: lastStatus === 401 || lastStatus === 403 ? 503 : 429, text: "", retryAfter: shortestCooldown };
}

export async function transcribeGroqAudio(audio: File) {
  const candidates = orderedKeyCandidates("speech");
  if (!candidates.length) return { status: 503, transcript: "", retryAfter: 0 };
  let shortestCooldown = 86_400;
  let lastStatus = 502;

  for (const candidate of candidates) {
    const coolingDown = remainingCooldown(candidate.apiKey, "speech");
    if (coolingDown) {
      shortestCooldown = Math.min(shortestCooldown, coolingDown);
      continue;
    }
    try {
      const body = new FormData();
      body.append("file", audio, audio.name || "english-practice.webm");
      body.append("model", process.env.GROQ_SPEECH_MODEL || "whisper-large-v3-turbo");
      body.append("language", "en");
      body.append("response_format", "json");
      body.append("temperature", "0");
      const response = await fetch(`${groqBaseUrl()}/audio/transcriptions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${candidate.apiKey}` },
        body,
        signal: AbortSignal.timeout(30_000),
      });
      lastStatus = response.status;
      const payload = await response.json().catch(() => null) as { text?: unknown } | null;
      if (response.status === 429 || response.status === 401 || response.status === 403) {
        shortestCooldown = Math.min(shortestCooldown, markUnavailable(candidate.apiKey, "speech", response));
        activeKeyIndex.speech = (candidate.index + 1) % candidates.length;
        continue;
      }
      if (response.status >= 500) {
        stateFor(candidate.apiKey).speech = Date.now() + 15_000;
        shortestCooldown = Math.min(shortestCooldown, 15);
        activeKeyIndex.speech = (candidate.index + 1) % candidates.length;
        continue;
      }
      activeKeyIndex.speech = candidate.index;
      return {
        status: response.status,
        transcript: response.ok && typeof payload?.text === "string" ? payload.text.trim().slice(0, 500) : "",
        retryAfter: 0,
      };
    } catch {
      stateFor(candidate.apiKey).speech = Date.now() + 15_000;
      shortestCooldown = Math.min(shortestCooldown, 15);
    }
  }
  return { status: lastStatus === 401 || lastStatus === 403 ? 503 : 429, transcript: "", retryAfter: shortestCooldown };
}

export function validateShortAudio(value: FormDataEntryValue | null): value is File {
  if (!(value instanceof File)) return false;
  const mime = value.type.toLowerCase().split(";")[0];
  const allowed = new Set(["audio/webm", "audio/ogg", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav", "video/webm"]);
  return value.size >= 200 && value.size <= 4 * 1024 * 1024 && allowed.has(mime);
}

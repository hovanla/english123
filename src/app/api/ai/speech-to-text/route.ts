import { NextResponse } from "next/server";
import { getActiveLearner } from "@/lib/learner";
import { prisma } from "@/lib/prisma";
import { transcribeGroqAudio, validateShortAudio } from "@/lib/groq";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const learner = await getActiveLearner();
  const form = await request.formData().catch(() => null);
  const audio = form?.get("audio") ?? null;
  if (!validateShortAudio(audio)) {
    return NextResponse.json({ error: "INVALID_AUDIO" }, { status: 400 });
  }

  try {
    const result = await transcribeGroqAudio(audio);
    if (result.status === 503) return NextResponse.json({ error: "GROQ_NOT_CONFIGURED" }, { status: 503 });
    if (result.status === 429) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
    if (result.status < 200 || result.status >= 300 || !result.transcript) {
      return NextResponse.json({ error: "SPEECH_NOT_RECOGNIZED" }, { status: 422 });
    }
    await prisma.productEvent.create({
      data: {
        learnerProfileId: learner.id,
        name: "ai_voice_transcribed",
        entityType: "LearnerProfile",
        entityId: learner.id,
        metadata: { provider: "groq", characters: result.transcript.length },
      },
    });
    return NextResponse.json({ transcript: result.transcript, provider: "groq-whisper" });
  } catch {
    return NextResponse.json({ error: "SPEECH_SERVICE_UNAVAILABLE" }, { status: 502 });
  }
}

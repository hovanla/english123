export type ListeningMode = "meaning" | "response";
export type ListeningItem = { id: string; prompt: string; answer: string; promptLang: "en-US"; answerLang: "en-US" };
type Activity = { id: string; type: string; payload: Record<string, unknown> };

export function buildListeningItems(activities: Activity[], mode: ListeningMode, weakIds?: string[]) {
  const seen = new Set<string>();
  return activities.flatMap((activity): ListeningItem[] => {
    if (weakIds && !weakIds.includes(activity.id)) return [];
    if (mode === "meaning" && activity.type !== "FLASHCARD") return [];
    if (mode === "response" && activity.type !== "SENTENCE") return [];
    const p = activity.payload;
    const value = (key: string) => typeof p[key] === "string" ? p[key].trim() : "";
    const english = value("front") || value("target");
    const prompt = mode === "meaning" ? english : value("partnerLine");
    const answer = mode === "meaning" ? value("definition") : english;
    const key = `${prompt}\u0000${answer}`;
    if (!prompt || !answer || seen.has(key)) return [];
    seen.add(key);
    return [{
      id: activity.id,
      prompt,
      answer,
      promptLang: "en-US",
      answerLang: "en-US",
    }];
  });
}

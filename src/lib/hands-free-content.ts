export type ListeningMode = "meaning" | "situation" | "response";
export type ListeningItem = { id: string; prompt: string; answer: string; promptLang: string; answerLang: string; englishAnswer?: string };
type Activity = { id: string; type: string; payload: Record<string, unknown> };

export function buildListeningItems(activities: Activity[], mode: ListeningMode, weakIds?: string[]) {
  const seen = new Set<string>();
  return activities.flatMap((activity): ListeningItem[] => {
    if (weakIds && !weakIds.includes(activity.id)) return [];
    if (!["FLASHCARD", "SENTENCE"].includes(activity.type)) return [];
    const p = activity.payload;
    const value = (key: string) => typeof p[key] === "string" ? p[key].trim() : "";
    const english = value("front") || value("target");
    const meaning = value("back") || value("translation");
    const prompt = mode === "meaning" ? english : mode === "situation" ? value("scenario") : value("partnerLine");
    const answer = mode === "meaning" ? meaning : english;
    const key = `${prompt}\u0000${answer}`;
    if (!prompt || !answer || seen.has(key)) return [];
    seen.add(key);
    const definition = value("definition");
    return [{
      id: activity.id,
      prompt,
      answer,
      promptLang: mode === "situation" ? "vi-VN" : "en-US",
      answerLang: mode === "meaning" ? "vi-VN" : "en-US",
      ...(mode === "meaning" && definition ? { englishAnswer: definition } : {}),
    }];
  });
}

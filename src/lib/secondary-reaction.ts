import { ActivityType } from "@prisma/client";

export type SecondarySentence = [target: string, translation: string, scenario: string];

export type SecondaryReactionActivity = {
  type: ActivityType;
  title: string;
  instruction: string;
  order: number;
  payload: Record<string, unknown>;
};

type SecondaryReactionVisuals = {
  imageUrl: string;
  spriteOffset: number;
  spriteColumns: number;
  spriteRows: number;
};

export function buildSecondaryReactionActivities(
  sentences: SecondarySentence[],
  visuals?: SecondaryReactionVisuals,
): SecondaryReactionActivity[] {
  return sentences.map(([target, translation, scenario], index) => {
    const partnerLine = index % 2 === 1 ? sentences[index - 1]?.[0] : undefined;
    return {
      type: ActivityType.SENTENCE,
      title: `Phản xạ hội thoại ${index + 1}`,
      instruction: partnerLine
        ? "Nghe người đối diện rồi tự tạo câu trả lời bằng tiếng Anh. Không dịch từng từ."
        : "Tự mở lời bằng một cụm tiếng Anh hoàn chỉnh. Chỉ mở gợi ý khi thật sự cần.",
      order: index + 1,
      payload: {
        mode: "RESPONSE_RECALL",
        prompt: partnerLine ? "Respond to your partner in English." : "Start the conversation in English.",
        scenario,
        partnerLine,
        target,
        translation,
        audioText: target,
        acceptedAnswers: [target],
        explanation: `${target} — ${translation}`,
        usage: scenario,
        ...(visuals ? {
          imageUrl: visuals.imageUrl,
          imageAlt: `Tranh minh họa tình huống giao tiếp ${index + 1}`,
          imageHint: scenario,
          spriteIndex: visuals.spriteOffset + index,
          spriteColumns: visuals.spriteColumns,
          spriteRows: visuals.spriteRows,
        } : {}),
      },
    };
  });
}

export function normalizeSpeechText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s']/g, " ").replace(/\s+/g, " ").trim();
}

function editDistance(expected: string[], actual: string[]) {
  const matrix = Array.from({ length: expected.length + 1 }, (_, row) =>
    Array.from({ length: actual.length + 1 }, (_, column) => row === 0 ? column : column === 0 ? row : 0),
  );
  for (let row = 1; row <= expected.length; row += 1) {
    for (let column = 1; column <= actual.length; column += 1) {
      matrix[row][column] = expected[row - 1] === actual[column - 1]
        ? matrix[row - 1][column - 1]
        : 1 + Math.min(matrix[row - 1][column], matrix[row][column - 1], matrix[row - 1][column - 1]);
    }
  }
  return matrix[expected.length][actual.length];
}

export function assessPronunciation(target: string, transcript: string) {
  const expected = normalizeSpeechText(target).split(" ").filter(Boolean);
  const actual = normalizeSpeechText(transcript).split(" ").filter(Boolean);
  const longest = Math.max(expected.length, actual.length, 1);
  const score = Math.max(0, Math.round((1 - editDistance(expected, actual) / longest) * 100));
  const actualWords = new Set(actual);
  const needsPractice = [...new Set(expected.filter((word) => !actualWords.has(word)))];
  const message = score >= 90
    ? "Rất rõ! Em đã nói gần đúng câu mẫu."
    : score >= 70
      ? "Khá tốt. Hãy nghe mẫu và nói chậm lại những từ được gợi ý."
      : "Hãy nghe lại câu mẫu, chia thành cụm ngắn rồi nói lại.";
  return { score, needsPractice, message };
}

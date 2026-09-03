type OrderedActivity = { id: string; type: string };

function shuffledRun<T>(items: T[], random: () => number) {
  if (items.length < 2) return [...items];

  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  if (shuffled.every((item, index) => item === items[index])) {
    shuffled.push(shuffled.shift()!);
  }
  return shuffled;
}

export function shuffleVocabularyActivities<T extends OrderedActivity, L extends { activities: T[] }>(
  lessons: L[],
  random: () => number = Math.random,
): L[] {
  return lessons.map((lesson) => {
    const activities = [...lesson.activities];

    for (let start = 0; start < activities.length;) {
      if (activities[start].type !== "FLASHCARD") {
        start += 1;
        continue;
      }

      let end = start + 1;
      while (end < activities.length && activities[end].type === "FLASHCARD") end += 1;
      activities.splice(start, end - start, ...shuffledRun(activities.slice(start, end), random));
      start = end;
    }

    return { ...lesson, activities } as L;
  });
}

type Pair = { left: string; right: string };

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededShuffle<T>(items: T[], key: string) {
  const shuffled = [...items];
  let state = hashString(key) || 1;
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const target = state % (index + 1);
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled;
}

export function buildMatchingOrder(pairs: Pair[], shuffleKey: string) {
  let rows = seededShuffle(pairs, `${shuffleKey}:words`);
  if (rows.length > 1 && rows.every((pair, index) => pair.left === pairs[index].left)) {
    rows = [...rows.slice(1), rows[0]];
  }

  if (rows.length < 2) return { rows, meanings: rows.map((pair) => pair.right) };
  const offset = 1 + (hashString(`${shuffleKey}:meanings`) % (rows.length - 1));
  const rowMeanings = rows.map((pair) => pair.right);
  const meanings = [...rowMeanings.slice(offset), ...rowMeanings.slice(0, offset)];
  return { rows, meanings };
}

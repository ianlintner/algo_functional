/**
 * Problem 94: Top K Frequent Words (LeetCode 692)
 * Difficulty: Med
 * Language: TypeScript
 */
function topKFrequent(words: string[], k: number): string[] {
  const freq = words.reduce<Record<string, number>>(
    (acc, w) => ({ ...acc, [w]: (acc[w] ?? 0) + 1 }), {}
  );
  return Object.entries(freq)
    .sort(([wa, ca], [wb, cb]) => cb - ca || wa.localeCompare(wb))
    .slice(0, k)
    .map(([w]) => w);
}

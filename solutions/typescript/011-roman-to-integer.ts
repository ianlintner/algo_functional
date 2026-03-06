/**
 * Problem 11: Roman to Integer (LeetCode 13)
 * Difficulty: Easy
 * Language: TypeScript
 */
function romanToInt(s: string): number {
  const values: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  };
  return [...s].reduceRight(
    (acc, ch) => {
      const v = values[ch];
      return v < acc.prev ? { sum: acc.sum - v, prev: v }
                          : { sum: acc.sum + v, prev: v };
    },
    { sum: 0, prev: 0 }
  ).sum;
}

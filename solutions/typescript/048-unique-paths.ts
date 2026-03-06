/**
 * Problem 48: Unique Paths (LeetCode 62)
 * Difficulty: Med
 * Language: TypeScript
 */
function uniquePaths(m: number, n: number): number {
  // C(m+n-2, m-1) using functional reduce
  const k = Math.min(m - 1, n - 1);
  return Array.from({ length: k }, (_, i) => i).reduce(
    (acc, i) => (acc * (m + n - 2 - i)) / (i + 1),
    1
  );
}

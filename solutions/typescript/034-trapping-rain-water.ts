/**
 * Problem 34: Trapping Rain Water (LeetCode 42)
 * Difficulty: Hard
 * Language: TypeScript
 */
function trap(height: number[]): number {
  const maxLeft = height.reduce<number[]>(
    (acc, h) => [...acc, Math.max(h, acc.length ? acc[acc.length - 1] : 0)], []);
  const maxRight = height.reduceRight<number[]>(
    (acc, h) => [Math.max(h, acc.length ? acc[0] : 0), ...acc], []);
  return height.reduce(
    (sum, h, i) => sum + Math.max(0, Math.min(maxLeft[i], maxRight[i]) - h), 0);
}

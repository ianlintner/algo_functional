/**
 * Problem 97: Number of 1 Bits (LeetCode 191)
 * Difficulty: Easy
 * Language: TypeScript
 */
function hammingWeight(n: number): number {
  const go = (num: number, count: number): number =>
    num === 0 ? count : go(num >>> 1, count + (num & 1));
  return go(n, 0);
}

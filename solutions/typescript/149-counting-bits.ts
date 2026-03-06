/**
 * Problem 149: Counting Bits (LeetCode 338)
 * Difficulty: Easy
 * Language: TypeScript
 */
function countBits(n: number): number[] {
  return Array.from({ length: n + 1 }, (_, i) => i).reduce<number[]>(
    (dp, i) => [...dp, i === 0 ? 0 : dp[i >> 1] + (i & 1)], []);
}

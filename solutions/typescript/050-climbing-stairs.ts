/**
 * Problem 50: Climbing Stairs (LeetCode 70)
 * Difficulty: Easy
 * Language: TypeScript
 */
function climbStairs(n: number): number {
  return Array.from({ length: n }).reduce<[number, number]>(
    ([a, b]) => [b, a + b],
    [1, 1]
  )[0];
}

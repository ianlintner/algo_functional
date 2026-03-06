/**
 * Problem 98: House Robber (LeetCode 198)
 * Difficulty: Med
 * Language: TypeScript
 */
function rob(nums: number[]): number {
  const [a] = nums.reduce<[number, number]>(
    ([prev1, prev2], n) => [Math.max(prev1, prev2 + n), prev1],
    [0, 0]
  );
  return a;
}

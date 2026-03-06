/**
 * Problem 152: Combination Sum IV (LeetCode 377)
 * Difficulty: Med
 * Language: TypeScript
 */
function combinationSum4(nums: number[], target: number): number {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  return Array.from({ length: target }, (_, i) => i + 1).reduce((dp, i) => {
    dp[i] = nums.reduce((sum, n) => sum + (i >= n ? dp[i - n] : 0), 0);
    return dp;
  }, dp)[target];
}

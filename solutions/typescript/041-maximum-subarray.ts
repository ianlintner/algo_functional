/**
 * Problem 41: Maximum Subarray (LeetCode 53)
 * Difficulty: Med
 * Language: TypeScript
 */
function maxSubArray(nums: number[]): number {
  return nums.reduce<{ maxSum: number; curSum: number }>(
    (acc, n) => {
      const curSum = Math.max(n, acc.curSum + n);
      return { maxSum: Math.max(acc.maxSum, curSum), curSum };
    },
    { maxSum: -Infinity, curSum: 0 }
  ).maxSum;
}

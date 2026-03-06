/**
 * Problem 80: Single Number (LeetCode 136)
 * Difficulty: Easy
 * Language: TypeScript
 */
function singleNumber(nums: number[]): number {
  return nums.reduce((acc, n) => acc ^ n, 0);
}

/**
 * Problem 122: Product of Array Except Self (LeetCode 238)
 * Difficulty: Med
 * Language: TypeScript
 */
function productExceptSelf(nums: number[]): number[] {
  const prefix = nums.reduce<number[]>(
    (acc, n, i) => [...acc, i === 0 ? 1 : acc[i - 1] * nums[i - 1]], []);
  const suffix = nums.reduceRight<number[]>(
    (acc, n, i) => i === nums.length - 1
      ? [1, ...acc] : [acc[0] * nums[i + 1], ...acc], []);
  return prefix.map((p, i) => p * suffix[i]);
}

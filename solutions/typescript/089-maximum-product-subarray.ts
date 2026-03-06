/**
 * Problem 89: Maximum Product Subarray (LeetCode 152)
 * Difficulty: Med
 * Language: TypeScript
 */
function maxProduct(nums: number[]): number {
  const [result] = nums.reduce<[number, number, number]>(
    ([best, curMax, curMin], n) => {
      const candidates = [n, curMax * n, curMin * n];
      const hi = Math.max(...candidates);
      const lo = Math.min(...candidates);
      return [Math.max(best, hi), hi, lo];
    },
    [nums[0], nums[0], nums[0]]
  );
  return result;
}

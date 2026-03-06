/**
 * Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
 * Difficulty: Med
 * Language: TypeScript
 */
function findMin(nums: number[]): number {
  const go = (lo: number, hi: number): number => {
    if (lo === hi) return nums[lo];
    const mid = Math.floor((lo + hi) / 2);
    return nums[mid] > nums[hi] ? go(mid + 1, hi) : go(lo, mid);
  };
  return go(0, nums.length - 1);
}

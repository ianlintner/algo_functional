/**
 * Problem 27: Search in Rotated Sorted Array (LeetCode 33)
 * Difficulty: Med
 * Language: TypeScript
 */
function search(nums: number[], target: number): number {
  const go = (lo: number, hi: number): number => {
    if (lo > hi) return -1;
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      return target >= nums[lo] && target < nums[mid]
        ? go(lo, mid - 1)
        : go(mid + 1, hi);
    }
    return target > nums[mid] && target <= nums[hi]
      ? go(mid + 1, hi)
      : go(lo, mid - 1);
  };
  return go(0, nums.length - 1);
}

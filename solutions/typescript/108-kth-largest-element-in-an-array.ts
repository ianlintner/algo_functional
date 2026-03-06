/**
 * Problem 108: Kth Largest Element in an Array (LeetCode 215)
 * Difficulty: Med
 * Language: TypeScript
 */
function findKthLargest(nums: number[], k: number): number {
  const pivot = nums[Math.floor(nums.length / 2)];
  const hi = nums.filter(x => x > pivot);
  const eq = nums.filter(x => x === pivot);
  const lo = nums.filter(x => x < pivot);
  if (k <= hi.length) return findKthLargest(hi, k);
  if (k <= hi.length + eq.length) return pivot;
  return findKthLargest(lo, k - hi.length - eq.length);
}

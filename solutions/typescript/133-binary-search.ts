/**
 * Problem 133: Binary Search (LeetCode 704)
 * Difficulty: Easy
 * Language: TypeScript
 */
function binarySearch(nums: number[], target: number): number {
  const search = (lo: number, hi: number): number => {
    if (lo > hi) return -1;
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    return nums[mid] < target ? search(mid + 1, hi) : search(lo, mid - 1);
  };
  return search(0, nums.length - 1);
}

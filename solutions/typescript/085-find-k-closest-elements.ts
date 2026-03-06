/**
 * Problem 85: Find K Closest Elements (LeetCode 658)
 * Difficulty: Med
 * Language: TypeScript
 */
function findClosestElements(arr: number[], k: number, x: number): number[] {
  const go = (lo: number, hi: number): number[] => {
    if (hi - lo === k) return arr.slice(lo, hi);
    return Math.abs(arr[lo] - x) <= Math.abs(arr[hi - 1] - x)
      ? go(lo, hi - 1)
      : go(lo + 1, hi);
  };
  return go(0, arr.length);
}

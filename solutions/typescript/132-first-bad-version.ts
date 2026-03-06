/**
 * Problem 132: First Bad Version (LeetCode 278)
 * Difficulty: Easy
 * Language: TypeScript
 */
// isBadVersion is provided by the API
function firstBadVersion(n: number): number {
  const search = (lo: number, hi: number): number => {
    if (lo >= hi) return lo;
    const mid = lo + Math.floor((hi - lo) / 2);
    return isBadVersion(mid) ? search(lo, mid) : search(mid + 1, hi);
  };
  return search(1, n);
}

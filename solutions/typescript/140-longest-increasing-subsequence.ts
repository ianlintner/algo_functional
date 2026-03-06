/**
 * Problem 140: Longest Increasing Subsequence (LeetCode 300)
 * Difficulty: Med
 * Language: TypeScript
 */
function lengthOfLIS(nums: number[]): number {
  // Patience sorting: maintain tails array with binary search
  const bisect = (tails: number[], target: number, lo: number, hi: number): number => {
    if (lo >= hi) return lo;
    const mid = lo + Math.floor((hi - lo) / 2);
    return tails[mid] < target ? bisect(tails, target, mid + 1, hi) : bisect(tails, target, lo, mid);
  };
  const result = nums.reduce<number[]>((tails, num) => {
    const pos = bisect(tails, num, 0, tails.length);
    const next = [...tails];
    if (pos === tails.length) next.push(num);
    else next[pos] = num;
    return next;
  }, []);
  return result.length;
}

/**
 * Problem 77: Longest Consecutive Sequence (LeetCode 128)
 * Difficulty: Med
 * Language: TypeScript
 */
function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  return [...numSet].reduce((maxLen, n) => {
    if (numSet.has(n - 1)) return maxLen;
    const len = (function count(x: number): number {
      return numSet.has(x) ? 1 + count(x + 1) : 0;
    })(n);
    return Math.max(maxLen, len);
  }, 0);
}

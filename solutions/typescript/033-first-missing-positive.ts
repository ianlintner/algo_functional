/**
 * Problem 33: First Missing Positive (LeetCode 41)
 * Difficulty: Hard
 * Language: TypeScript
 */
function firstMissingPositive(nums: number[]): number {
  const s = new Set(nums.filter(n => n > 0));
  const find = (i: number): number => s.has(i) ? find(i + 1) : i;
  return find(1);
}

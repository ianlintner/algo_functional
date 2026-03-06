/**
 * Problem 95: Rotate Array (LeetCode 189)
 * Difficulty: Med
 * Language: TypeScript
 */
function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  const shift = k % n;
  return [...nums.slice(n - shift), ...nums.slice(0, n - shift)];
}

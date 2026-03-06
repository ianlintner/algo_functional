/**
 * Problem 134: Move Zeroes (LeetCode 283)
 * Difficulty: Easy
 * Language: TypeScript
 */
function moveZeroes(nums: number[]): number[] {
  const nonZeros = nums.filter(x => x !== 0);
  const zeros = nums.filter(x => x === 0);
  return [...nonZeros, ...zeros];
}

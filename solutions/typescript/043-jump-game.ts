/**
 * Problem 43: Jump Game (LeetCode 55)
 * Difficulty: Med
 * Language: TypeScript
 */
function canJump(nums: number[]): boolean {
  return nums.reduce(
    (maxReach, n, i) => (i > maxReach ? -1 : Math.max(maxReach, i + n)),
    0
  ) >= nums.length - 1;
}

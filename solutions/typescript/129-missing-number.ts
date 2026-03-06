/**
 * Problem 129: Missing Number (LeetCode 268)
 * Difficulty: Easy
 * Language: TypeScript
 */
function missingNumber(nums: number[]): number {
  const n = nums.length;
  return nums.reduce((acc, v) => acc ^ v, 0) ^
         Array.from({ length: n + 1 }, (_, i) => i)
           .reduce((acc, v) => acc ^ v, 0);
}

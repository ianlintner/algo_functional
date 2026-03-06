/**
 * Problem 168: Squares of a Sorted Array (LeetCode 977)
 * Difficulty: Easy
 * Language: TypeScript
 */
function sortedSquares(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n);
  const build = (l: number, r: number, i: number): number[] => {
    if (i < 0) return result;
    if (Math.abs(nums[l]) >= Math.abs(nums[r])) {
      result[i] = nums[l] ** 2;
      return build(l + 1, r, i - 1);
    }
    result[i] = nums[r] ** 2;
    return build(l, r - 1, i - 1);
  };
  return build(0, n - 1, n - 1);
}

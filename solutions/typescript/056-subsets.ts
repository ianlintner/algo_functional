/**
 * Problem 56: Subsets (LeetCode 78)
 * Difficulty: Med
 * Language: TypeScript
 */
function subsets(nums: number[]): number[][] {
  return nums.reduce<number[][]>(
    (acc, num) => [...acc, ...acc.map(sub => [...sub, num])],
    [[]]
  );
}

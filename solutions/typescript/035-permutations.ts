/**
 * Problem 35: Permutations (LeetCode 46)
 * Difficulty: Med
 * Language: TypeScript
 */
function permute(nums: number[]): number[][] {
  if (nums.length === 0) return [[]];
  return nums.flatMap((n, i) => {
    const rest = [...nums.slice(0, i), ...nums.slice(i + 1)];
    return permute(rest).map(p => [n, ...p]);
  });
}

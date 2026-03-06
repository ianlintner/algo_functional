/**
 * Problem 160: Partition Equal Subset Sum (LeetCode 416)
 * Difficulty: Med
 * Language: TypeScript
 */
function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  return nums.reduce<Set<number>>(
    (dp, num) => new Set([...dp, ...[...dp].map(s => s + num)]),
    new Set([0])
  ).has(target);
}

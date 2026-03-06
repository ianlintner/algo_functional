/**
 * Problem 53: Sort Colors (LeetCode 75)
 * Difficulty: Med
 * Language: TypeScript
 */
function sortColors(nums: number[]): number[] {
  const counts = nums.reduce(
    (acc, n) => acc.map((c, i) => (i === n ? c + 1 : c)),
    [0, 0, 0]
  );
  return counts.flatMap((count, color) => Array(count).fill(color));
}

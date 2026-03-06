/**
 * Problem 109: Contains Duplicate (LeetCode 217)
 * Difficulty: Easy
 * Language: TypeScript
 */
function containsDuplicate(nums: number[]): boolean {
  return nums.reduce<{ seen: Set<number>; dup: boolean }>(
    (acc, n) => acc.dup ? acc
      : acc.seen.has(n) ? { ...acc, dup: true }
      : { seen: new Set([...acc.seen, n]), dup: false },
    { seen: new Set(), dup: false }
  ).dup;
}

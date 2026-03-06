/**
 * Problem 136: Find the Duplicate Number (LeetCode 287)
 * Difficulty: Med
 * Language: TypeScript
 */
// Floyd's cycle detection on index mapping
function findDuplicate(nums: number[]): number {
  const step = (pos: number) => nums[pos];
  const findMeet = (slow: number, fast: number): number => {
    const s = step(slow);
    const f = step(step(fast));
    return s === f ? s : findMeet(s, f);
  };
  const findStart = (a: number, b: number): number =>
    a === b ? a : findStart(step(a), step(b));
  const meet = findMeet(0, 0);
  return findStart(0, meet);
}

/**
 * Problem 164: Non-overlapping Intervals (LeetCode 435)
 * Difficulty: Med
 * Language: TypeScript
 */
function eraseOverlapIntervals(intervals: number[][]): number {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  return sorted.reduce(
    ([count, end], [s, e]) =>
      s < end ? [count + 1, end] as [number, number]
              : [count, e] as [number, number],
    [0, -Infinity] as [number, number]
  )[0];
}

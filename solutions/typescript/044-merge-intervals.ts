/**
 * Problem 44: Merge Intervals (LeetCode 56)
 * Difficulty: Med
 * Language: TypeScript
 */
function merge(intervals: number[][]): number[][] {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  return sorted.reduce<number[][]>((acc, cur) => {
    const last = acc[acc.length - 1];
    if (last && cur[0] <= last[1]) {
      return [...acc.slice(0, -1), [last[0], Math.max(last[1], cur[1])]];
    }
    return [...acc, cur];
  }, []);
}

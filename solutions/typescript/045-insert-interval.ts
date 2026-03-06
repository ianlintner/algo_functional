/**
 * Problem 45: Insert Interval (LeetCode 57)
 * Difficulty: Med
 * Language: TypeScript
 */
function insert(intervals: number[][], newInterval: number[]): number[][] {
  const merged = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  return merged.reduce<number[][]>((acc, cur) => {
    const last = acc[acc.length - 1];
    if (last && cur[0] <= last[1]) {
      return [...acc.slice(0, -1), [last[0], Math.max(last[1], cur[1])]];
    }
    return [...acc, cur];
  }, []);
}

/**
 * Problem 125: Employee Free Time (LeetCode 759)
 * Difficulty: Hard
 * Language: TypeScript
 */
function employeeFreeTime(schedules: number[][][]): number[][] {
  const all = schedules.flat()
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged = all.reduce<number[][]>((acc, interval) => {
    if (acc.length === 0 || acc[acc.length - 1][1] < interval[0])
      return [...acc, interval];
    return [...acc.slice(0, -1),
      [acc[acc.length - 1][0], Math.max(acc[acc.length - 1][1], interval[1])]];
  }, []);
  return merged.slice(1).reduce<number[][]>(
    (gaps, interval, i) =>
      merged[i][1] < interval[0]
        ? [...gaps, [merged[i][1], interval[0]]] : gaps, []);
}

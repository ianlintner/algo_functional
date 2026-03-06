/**
 * Problem 68: Task Scheduler (LeetCode 621)
 * Difficulty: Med
 * Language: TypeScript
 */
function leastInterval(tasks: string[], n: number): number {
  const freq = tasks.reduce<Record<string, number>>(
    (acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {}
  );
  const maxFreq = Math.max(...Object.values(freq));
  const maxCount = Object.values(freq).filter(f => f === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}

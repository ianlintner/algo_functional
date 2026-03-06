/**
 * Problem 147: Maximum Profit in Job Scheduling (LeetCode 1235)
 * Difficulty: Hard
 * Language: TypeScript
 */
function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
  const jobs = startTime.map((s, i) => [s, endTime[i], profit[i]])
    .sort((a, b) => a[1] - b[1]);
  const n = jobs.length;
  const dp = new Array(n + 1).fill(0);
  const ends = jobs.map(j => j[1]);
  const bisect = (val: number, hi: number): number => {
    let lo = 0;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; ends[mid - 1] <= val ? lo = mid : hi = mid - 1; }
    return lo;
  };
  for (let i = 1; i <= n; i++) {
    const prev = bisect(jobs[i-1][0], i - 1);
    dp[i] = Math.max(dp[i-1], dp[prev] + jobs[i-1][2]);
  }
  return dp[n];
}

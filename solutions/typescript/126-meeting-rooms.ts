/**
 * Problem 126: Meeting Rooms (LeetCode 252)
 * Difficulty: Easy
 * Language: TypeScript
 */
function canAttendMeetings(intervals: number[][]): boolean {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  return sorted.every((v, i) => i === 0 || sorted[i - 1][1] <= v[0]);
}

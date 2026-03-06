/**
 * Problem 127: Meeting Rooms II (LeetCode 253)
 * Difficulty: Med
 * Language: TypeScript
 */
function minMeetingRooms(intervals: number[][]): number {
  const starts = [...intervals].map(i => i[0]).sort((a, b) => a - b);
  const ends = [...intervals].map(i => i[1]).sort((a, b) => a - b);
  const go = (si: number, ei: number, rooms: number, maxR: number): number => {
    if (si >= starts.length) return maxR;
    if (starts[si] < ends[ei])
      return go(si + 1, ei, rooms + 1, Math.max(maxR, rooms + 1));
    return go(si + 1, ei + 1, rooms, maxR);
  };
  return go(0, 0, 0, 0);
}

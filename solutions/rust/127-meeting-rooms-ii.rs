/**
 * Problem 127: Meeting Rooms II (LeetCode 253)
 * Difficulty: Med
 * Language: Rust
 */
fn min_meeting_rooms(intervals: &[(i32, i32)]) -> i32 {
    let mut starts: Vec<i32> = intervals.iter().map(|i| i.0).collect();
    let mut ends: Vec<i32> = intervals.iter().map(|i| i.1).collect();
    starts.sort(); ends.sort();
    fn go(starts: &[i32], ends: &[i32], si: usize, ei: usize,
          rooms: i32, max_r: i32) -> i32 {
        if si >= starts.len() { return max_r; }
        if starts[si] < ends[ei] {
            go(starts, ends, si+1, ei, rooms+1, max_r.max(rooms+1))
        } else {
            go(starts, ends, si+1, ei+1, rooms, max_r)
        }
    }
    go(&starts, &ends, 0, 0, 0, 0)
}

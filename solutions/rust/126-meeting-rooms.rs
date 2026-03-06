/**
 * Problem 126: Meeting Rooms (LeetCode 252)
 * Difficulty: Easy
 * Language: Rust
 */
fn can_attend_meetings(intervals: &mut Vec<(i32, i32)>) -> bool {
    intervals.sort();
    intervals.windows(2).all(|w| w[0].1 <= w[1].0)
}

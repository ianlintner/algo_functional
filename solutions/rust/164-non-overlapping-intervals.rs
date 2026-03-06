/**
 * Problem 164: Non-overlapping Intervals (LeetCode 435)
 * Difficulty: Med
 * Language: Rust
 */
fn erase_overlap_intervals(intervals: &mut Vec<Vec<i32>>) -> i32 {
    intervals.sort_by_key(|i| i[1]);
    intervals.iter().fold((0, i32::MIN), |(count, end), iv| {
        if iv[0] < end { (count + 1, end) }
        else { (count, iv[1]) }
    }).0
}

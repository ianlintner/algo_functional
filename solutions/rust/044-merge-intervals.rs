/**
 * Problem 44: Merge Intervals (LeetCode 56)
 * Difficulty: Med
 * Language: Rust
 */
pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let mut sorted = intervals.clone();
    sorted.sort_by_key(|v| v[0]);
    sorted.into_iter().fold(vec![], |mut acc, cur| {
        if let Some(last) = acc.last_mut() {
            if cur[0] <= last[1] {
                last[1] = last[1].max(cur[1]);
                return acc;
            }
        }
        acc.push(cur);
        acc
    })
}

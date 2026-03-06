/**
 * Problem 45: Insert Interval (LeetCode 57)
 * Difficulty: Med
 * Language: Rust
 */
pub fn insert(intervals: Vec<Vec<i32>>, new_interval: Vec<i32>) -> Vec<Vec<i32>> {
    let mut all = intervals.clone();
    all.push(new_interval);
    all.sort_by_key(|v| v[0]);
    all.into_iter().fold(vec![], |mut acc, cur| {
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

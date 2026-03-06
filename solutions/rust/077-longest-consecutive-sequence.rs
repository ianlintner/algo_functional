/**
 * Problem 77: Longest Consecutive Sequence (LeetCode 128)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashSet;
fn longest_consecutive(nums: Vec<i32>) -> i32 {
    let set: HashSet<i32> = nums.into_iter().collect();
    set.iter().fold(0, |mx, &n| {
        if set.contains(&(n - 1)) { mx }
        else {
            let len = (0..).take_while(|&i| set.contains(&(n + i))).count() as i32;
            mx.max(len)
        }
    })
}

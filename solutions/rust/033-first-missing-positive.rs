/**
 * Problem 33: First Missing Positive (LeetCode 41)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::HashSet;

pub fn first_missing_positive(nums: Vec<i32>) -> i32 {
    let s: HashSet<i32> = nums.into_iter().filter(|&n| n > 0).collect();
    (1..).find(|n| !s.contains(n)).unwrap()
}

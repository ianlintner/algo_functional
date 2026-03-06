/**
 * Problem 109: Contains Duplicate (LeetCode 217)
 * Difficulty: Easy
 * Language: Rust
 */
use std::collections::HashSet;

fn contains_duplicate(nums: &[i32]) -> bool {
    nums.iter().try_fold(HashSet::new(), |mut s, &n| {
        if s.contains(&n) { Err(()) } else { s.insert(n); Ok(s) }
    }).is_err()
}

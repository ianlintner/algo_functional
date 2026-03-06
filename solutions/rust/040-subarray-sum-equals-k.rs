/**
 * Problem 40: Subarray Sum Equals K (LeetCode 560)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
    nums.iter().fold(
        (0, 0, HashMap::from([(0, 1)])),
        |(count, sum, mut map), &n| {
            let s = sum + n;
            let c = count + map.get(&(s - k)).unwrap_or(&0);
            *map.entry(s).or_insert(0) += 1;
            (c, s, map)
        }
    ).0
}

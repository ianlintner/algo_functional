/**
 * Problem 1: Two Sum (LeetCode 1)
 * Difficulty: Easy
 * Language: Rust
 */
use std::collections::HashMap;

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    nums.iter()
        .enumerate()
        .try_fold(HashMap::new(), |mut map, (i, &num)| {
            let complement = target - num;
            if let Some(&j) = map.get(&complement) {
                Err(vec![j as i32, i as i32])
            } else {
                map.insert(num, i);
                Ok(map)
            }
        })
        .unwrap_err()
}

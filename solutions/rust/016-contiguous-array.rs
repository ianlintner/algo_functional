/**
 * Problem 16: Contiguous Array (LeetCode 525)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

pub fn find_max_length(nums: Vec<i32>) -> i32 {
    let (_, _, result) = nums.iter().enumerate().fold(
        (HashMap::from([(0i32, -1i32)]), 0i32, 0i32),
        |(mut map, count, best), (i, &num)| {
            let new_count = count + if num == 1 { 1 } else { -1 };
            let new_best = map
                .get(&new_count)
                .map(|&j| best.max(i as i32 - j))
                .unwrap_or(best);
            map.entry(new_count).or_insert(i as i32);
            (map, new_count, new_best)
        },
    );
    result
}

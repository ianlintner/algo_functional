/**
 * Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

pub fn length_of_longest_substring(s: String) -> i32 {
    let (_, _, result) = s.chars().enumerate().fold(
        (0usize, HashMap::new(), 0usize),
        |(left, mut seen, best), (i, c)| {
            let new_left = seen
                .get(&c)
                .map(|&j| left.max(j + 1))
                .unwrap_or(left);
            seen.insert(c, i);
            (new_left, seen, best.max(i - new_left + 1))
        },
    );
    result as i32
}

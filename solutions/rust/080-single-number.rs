/**
 * Problem 80: Single Number (LeetCode 136)
 * Difficulty: Easy
 * Language: Rust
 */
fn single_number(nums: Vec<i32>) -> i32 {
    nums.iter().fold(0, |acc, &n| acc ^ n)
}

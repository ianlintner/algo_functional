/**
 * Problem 129: Missing Number (LeetCode 268)
 * Difficulty: Easy
 * Language: Rust
 */
fn missing_number(nums: &[i32]) -> i32 {
    let n = nums.len() as i32;
    let xor_nums = nums.iter().fold(0, |acc, &x| acc ^ x);
    let xor_all = (0..=n).fold(0, |acc, x| acc ^ x);
    xor_nums ^ xor_all
}

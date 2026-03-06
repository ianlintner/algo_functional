/**
 * Problem 122: Product of Array Except Self (LeetCode 238)
 * Difficulty: Med
 * Language: Rust
 */
fn product_except_self(nums: &[i32]) -> Vec<i32> {
    let n = nums.len();
    let prefix: Vec<i32> = (0..n).fold(vec![], |mut acc, i| {
        acc.push(if i == 0 { 1 } else { acc[i-1] * nums[i-1] });
        acc
    });
    let suffix: Vec<i32> = (0..n).rev().fold(vec![0; n], |mut acc, i| {
        acc[i] = if i == n-1 { 1 } else { acc[i+1] * nums[i+1] };
        acc
    });
    prefix.iter().zip(suffix.iter()).map(|(a, b)| a * b).collect()
}

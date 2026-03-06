/**
 * Problem 95: Rotate Array (LeetCode 189)
 * Difficulty: Med
 * Language: Rust
 */
fn rotate(nums: &[i32], k: usize) -> Vec<i32> {
    let n = nums.len();
    let s = k % n;
    [&nums[n - s..], &nums[..n - s]].concat()
}

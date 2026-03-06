/**
 * Problem 41: Maximum Subarray (LeetCode 53)
 * Difficulty: Med
 * Language: Rust
 */
pub fn max_sub_array(nums: Vec<i32>) -> i32 {
    nums.iter().skip(1).fold(
        (nums[0], nums[0]),
        |(best, cur), &n| {
            let cur = n.max(cur + n);
            (best.max(cur), cur)
        }
    ).0
}

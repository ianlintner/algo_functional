/**
 * Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
 * Difficulty: Med
 * Language: Rust
 */
fn find_min(nums: &[i32]) -> i32 {
    fn go(nums: &[i32], lo: usize, hi: usize) -> i32 {
        if lo == hi { return nums[lo]; }
        let mid = (lo + hi) / 2;
        if nums[mid] > nums[hi] { go(nums, mid + 1, hi) }
        else { go(nums, lo, mid) }
    }
    go(nums, 0, nums.len() - 1)
}

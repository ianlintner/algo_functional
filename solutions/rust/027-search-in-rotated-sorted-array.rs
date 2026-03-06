/**
 * Problem 27: Search in Rotated Sorted Array (LeetCode 33)
 * Difficulty: Med
 * Language: Rust
 */
pub fn search(nums: Vec<i32>, target: i32) -> i32 {
    fn go(nums: &[i32], target: i32, lo: usize, hi: isize) -> i32 {
        if lo as isize > hi { return -1; }
        let mid = (lo as isize + hi) as usize / 2;
        if nums[mid] == target { return mid as i32; }
        if nums[lo] <= nums[mid] {
            if target >= nums[lo] && target < nums[mid] {
                go(nums, target, lo, mid as isize - 1)
            } else {
                go(nums, target, mid + 1, hi)
            }
        } else if target > nums[mid] && target <= nums[hi as usize] {
            go(nums, target, mid + 1, hi)
        } else {
            go(nums, target, lo, mid as isize - 1)
        }
    }
    if nums.is_empty() { return -1; }
    go(&nums, target, 0, nums.len() as isize - 1)
}

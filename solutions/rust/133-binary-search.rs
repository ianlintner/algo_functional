/**
 * Problem 133: Binary Search (LeetCode 704)
 * Difficulty: Easy
 * Language: Rust
 */
fn binary_search(nums: &[i32], target: i32) -> i32 {
    fn search(nums: &[i32], target: i32, lo: usize, hi: isize) -> i32 {
        if lo as isize > hi { return -1; }
        let mid = lo + ((hi as usize - lo) / 2);
        if nums[mid] == target { mid as i32 }
        else if nums[mid] < target { search(nums, target, mid + 1, hi) }
        else { search(nums, target, lo, mid as isize - 1) }
    }
    search(nums, target, 0, nums.len() as isize - 1)
}

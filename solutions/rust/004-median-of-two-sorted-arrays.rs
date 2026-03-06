/**
 * Problem 4: Median of Two Sorted Arrays (LeetCode 4)
 * Difficulty: Hard
 * Language: Rust
 */
pub fn find_median_sorted_arrays(mut nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
    nums1.extend(nums2);
    nums1.sort_unstable();
    let n = nums1.len();
    let mid = n / 2;
    if n % 2 == 0 {
        (nums1[mid - 1] + nums1[mid]) as f64 / 2.0
    } else {
        nums1[mid] as f64
    }
}

/**
 * Problem 108: Kth Largest Element in an Array (LeetCode 215)
 * Difficulty: Med
 * Language: Rust
 */
fn find_kth_largest(nums: &[i32], k: usize) -> i32 {
    let pivot = nums[nums.len() / 2];
    let hi: Vec<_> = nums.iter().filter(|&&x| x > pivot).cloned().collect();
    let eq: Vec<_> = nums.iter().filter(|&&x| x == pivot).cloned().collect();
    let lo: Vec<_> = nums.iter().filter(|&&x| x < pivot).cloned().collect();
    if k <= hi.len() { find_kth_largest(&hi, k) }
    else if k <= hi.len() + eq.len() { pivot }
    else { find_kth_largest(&lo, k - hi.len() - eq.len()) }
}

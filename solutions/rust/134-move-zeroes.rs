/**
 * Problem 134: Move Zeroes (LeetCode 283)
 * Difficulty: Easy
 * Language: Rust
 */
fn move_zeroes(nums: &[i32]) -> Vec<i32> {
    let non_zeros: Vec<i32> = nums.iter().filter(|&&x| x != 0).copied().collect();
    let zeros = vec![0; nums.len() - non_zeros.len()];
    [non_zeros, zeros].concat()
}

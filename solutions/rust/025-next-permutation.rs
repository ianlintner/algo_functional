/**
 * Problem 25: Next Permutation (LeetCode 31)
 * Difficulty: Med
 * Language: Rust
 */
pub fn next_permutation(nums: &mut Vec<i32>) {
    let n = nums.len();
    if n <= 1 { return; }

    // Find i: rightmost index where nums[i] < nums[i+1]
    let i = (0..n - 1).rev().find(|&i| nums[i] < nums[i + 1]);

    match i {
        None => nums.reverse(),
        Some(i) => {
            let j = (0..n).rev().find(|&j| nums[j] > nums[i]).unwrap();
            nums.swap(i, j);
            nums[i + 1..].reverse();
        }
    }
}

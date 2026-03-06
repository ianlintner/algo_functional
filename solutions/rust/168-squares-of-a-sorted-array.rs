/**
 * Problem 168: Squares of a Sorted Array (LeetCode 977)
 * Difficulty: Easy
 * Language: Rust
 */
fn sorted_squares(nums: &[i32]) -> Vec<i32> {
    let n = nums.len();
    let mut result = vec![0; n];
    let (mut l, mut r, mut i) = (0, n - 1, n - 1);
    loop {
        if nums[l].abs() >= nums[r].abs() {
            result[i] = nums[l] * nums[l];
            l += 1;
        } else {
            result[i] = nums[r] * nums[r];
            if r == 0 { break; }
            r -= 1;
        }
        if i == 0 { break; }
        i -= 1;
    }
    result
}

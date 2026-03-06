/**
 * Problem 14: 3Sum Closest (LeetCode 16)
 * Difficulty: Med
 * Language: Rust
 */
pub fn three_sum_closest(mut nums: Vec<i32>, target: i32) -> i32 {
    nums.sort();
    let n = nums.len();
    let mut closest = nums[0] + nums[1] + nums[2];
    for i in 0..n - 2 {
        let (mut l, mut r) = (i + 1, n - 1);
        while l < r {
            let sum = nums[i] + nums[l] + nums[r];
            if (sum - target).abs() < (closest - target).abs() {
                closest = sum;
            }
            match sum.cmp(&target) {
                std::cmp::Ordering::Less => l += 1,
                std::cmp::Ordering::Greater => r -= 1,
                _ => return target,
            }
        }
    }
    closest
}

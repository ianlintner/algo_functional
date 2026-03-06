/**
 * Problem 13: 3Sum (LeetCode 15)
 * Difficulty: Med
 * Language: Rust
 */
pub fn three_sum(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
    nums.sort();
    let n = nums.len();
    let mut result = Vec::new();
    for i in 0..n {
        if i > 0 && nums[i] == nums[i - 1] { continue; }
        let (mut l, mut r) = (i + 1, n.wrapping_sub(1));
        while l < r {
            let sum = nums[i] + nums[l] + nums[r];
            match sum.cmp(&0) {
                std::cmp::Ordering::Less => l += 1,
                std::cmp::Ordering::Greater => r -= 1,
                std::cmp::Ordering::Equal => {
                    result.push(vec![nums[i], nums[l], nums[r]]);
                    while l < r && nums[l] == nums[l + 1] { l += 1; }
                    l += 1; r -= 1;
                }
            }
        }
    }
    result
}

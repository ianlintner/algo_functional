/**
 * Problem 152: Combination Sum IV (LeetCode 377)
 * Difficulty: Med
 * Language: Rust
 */
fn combination_sum4(nums: &[i32], target: i32) -> i32 {
    (1..=target as usize).fold(vec![1i32].into_iter()
        .chain(std::iter::repeat(0)).take(target as usize + 1)
        .collect::<Vec<_>>(), |mut dp, i| {
        dp[i] = nums.iter().filter(|&&n| n as usize <= i)
            .map(|&n| dp[i - n as usize]).sum();
        dp
    })[target as usize]
}

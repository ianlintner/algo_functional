/**
 * Problem 160: Partition Equal Subset Sum (LeetCode 416)
 * Difficulty: Med
 * Language: Rust
 */
fn can_partition(nums: &[i32]) -> bool {
    let total: i32 = nums.iter().sum();
    if total % 2 != 0 { return false; }
    let target = (total / 2) as usize;
    let mut dp = vec![false; target + 1];
    dp[0] = true;
    for &num in nums {
        let n = num as usize;
        for j in (n..=target).rev() {
            dp[j] = dp[j] || dp[j - n];
        }
    }
    dp[target]
}

/**
 * Problem 98: House Robber (LeetCode 198)
 * Difficulty: Med
 * Language: Rust
 */
fn rob(nums: &[i32]) -> i32 {
    nums.iter().fold((0, 0), |(p1, p2), &n| (p1.max(p2 + n), p1)).0
}

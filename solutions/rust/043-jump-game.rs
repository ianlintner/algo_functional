/**
 * Problem 43: Jump Game (LeetCode 55)
 * Difficulty: Med
 * Language: Rust
 */
pub fn can_jump(nums: Vec<i32>) -> bool {
    nums.iter().enumerate().fold(0i32, |reach, (i, &n)| {
        if (i as i32) > reach { -1 } else { reach.max(i as i32 + n) }
    }) >= (nums.len() as i32 - 1)
}

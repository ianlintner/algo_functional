/**
 * Problem 50: Climbing Stairs (LeetCode 70)
 * Difficulty: Easy
 * Language: Rust
 */
pub fn climb_stairs(n: i32) -> i32 {
    (1..n).fold((1, 1), |(a, b), _| (b, a + b)).0
}

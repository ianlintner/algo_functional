/**
 * Problem 48: Unique Paths (LeetCode 62)
 * Difficulty: Med
 * Language: Rust
 */
pub fn unique_paths(m: i32, n: i32) -> i32 {
    let k = m.min(n) - 1;
    (0..k).fold(1i64, |acc, i| acc * (m as i64 + n as i64 - 2 - i as i64) / (i as i64 + 1)) as i32
}

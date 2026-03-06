/**
 * Problem 6: Reverse Integer (LeetCode 7)
 * Difficulty: Med
 * Language: Rust
 */
pub fn reverse(x: i32) -> i32 {
    let sign = if x < 0 { -1i64 } else { 1i64 };
    let reversed = x.abs()
        .to_string()
        .chars()
        .rev()
        .collect::<String>()
        .parse::<i64>()
        .unwrap_or(0)
        * sign;
    if reversed > i32::MAX as i64 || reversed < i32::MIN as i64 {
        0
    } else {
        reversed as i32
    }
}

/**
 * Problem 8: Palindrome Number (LeetCode 9)
 * Difficulty: Easy
 * Language: Rust
 */
pub fn is_palindrome(x: i32) -> bool {
    if x < 0 { return false; }
    let s: Vec<char> = x.to_string().chars().collect();
    s.iter().zip(s.iter().rev()).all(|(a, b)| a == b)
}

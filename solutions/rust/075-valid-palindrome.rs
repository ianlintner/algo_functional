/**
 * Problem 75: Valid Palindrome (LeetCode 125)
 * Difficulty: Easy
 * Language: Rust
 */
fn is_palindrome(s: &str) -> bool {
    let chars: Vec<char> = s.to_lowercase().chars().filter(|c| c.is_alphanumeric()).collect();
    chars.iter().eq(chars.iter().rev())
}

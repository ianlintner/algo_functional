/**
 * Problem 12: Longest Common Prefix (LeetCode 14)
 * Difficulty: Easy
 * Language: Rust
 */
pub fn longest_common_prefix(strs: Vec<String>) -> String {
    if strs.is_empty() { return String::new(); }
    strs[1..].iter().fold(strs[0].clone(), |prefix, s| {
        prefix
            .chars()
            .zip(s.chars())
            .take_while(|(a, b)| a == b)
            .map(|(a, _)| a)
            .collect()
    })
}

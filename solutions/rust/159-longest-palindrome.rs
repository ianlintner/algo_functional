/**
 * Problem 159: Longest Palindrome (LeetCode 409)
 * Difficulty: Easy
 * Language: Rust
 */
fn longest_palindrome(s: &str) -> usize {
    let freq = s.chars().fold(std::collections::HashMap::new(), |mut m, c| {
        *m.entry(c).or_insert(0usize) += 1; m
    });
    let pairs: usize = freq.values().map(|&c| (c / 2) * 2).sum();
    pairs + if pairs < s.len() { 1 } else { 0 }
}

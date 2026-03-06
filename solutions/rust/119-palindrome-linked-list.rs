/**
 * Problem 119: Palindrome Linked List (LeetCode 234)
 * Difficulty: Easy
 * Language: Rust
 */
fn is_palindrome_list(vals: &[i32]) -> bool {
    let rev: Vec<i32> = vals.iter().rev().cloned().collect();
    vals == rev.as_slice()
}

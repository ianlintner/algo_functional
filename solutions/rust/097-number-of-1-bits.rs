/**
 * Problem 97: Number of 1 Bits (LeetCode 191)
 * Difficulty: Easy
 * Language: Rust
 */
fn hamming_weight(n: u32) -> u32 {
    if n == 0 { 0 } else { (n & 1) + hamming_weight(n >> 1) }
}

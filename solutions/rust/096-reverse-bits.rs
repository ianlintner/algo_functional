/**
 * Problem 96: Reverse Bits (LeetCode 190)
 * Difficulty: Easy
 * Language: Rust
 */
fn reverse_bits(n: u32) -> u32 {
    (0..32).fold(0u32, |acc, i| acc | (((n >> i) & 1) << (31 - i)))
}

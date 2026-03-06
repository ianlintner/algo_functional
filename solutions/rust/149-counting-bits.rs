/**
 * Problem 149: Counting Bits (LeetCode 338)
 * Difficulty: Easy
 * Language: Rust
 */
fn count_bits(n: usize) -> Vec<i32> {
    (0..=n).fold(Vec::new(), |mut dp, i| {
        let val = if i == 0 { 0 } else { dp[i >> 1] + (i as i32 & 1) };
        dp.push(val); dp
    })
}

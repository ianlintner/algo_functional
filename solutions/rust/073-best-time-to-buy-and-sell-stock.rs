/**
 * Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
 * Difficulty: Easy
 * Language: Rust
 */
fn max_profit(prices: Vec<i32>) -> i32 {
    prices.iter().fold((i32::MAX, 0), |(min_p, max_prof), &p| {
        (min_p.min(p), max_prof.max(p - min_p))
    }).1
}

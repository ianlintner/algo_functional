/**
 * Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
 * Difficulty: Med
 * Language: Rust
 */
fn find_cheapest_price(n: usize, flights: &[(usize,usize,i32)], src: usize, dst: usize, k: usize) -> i32 {
    let inf = i32::MAX;
    let mut prices = vec![inf; n];
    prices[src] = 0;
    for _ in 0..=k {
        let prev = prices.clone();
        for &(u, v, w) in flights {
            if prev[u] < inf && prev[u] + w < prices[v] {
                prices[v] = prev[u] + w;
            }
        }
    }
    if prices[dst] == inf { -1 } else { prices[dst] }
}

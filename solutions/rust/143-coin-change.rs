/**
 * Problem 143: Coin Change (LeetCode 322)
 * Difficulty: Med
 * Language: Rust
 */
fn coin_change(coins: &[i32], amount: usize) -> i32 {
    let inf = amount + 1;
    let dp: Vec<usize> = (0..=amount).map(|i| if i == 0 { 0 } else { inf }).collect();
    let result = coins.iter().fold(dp, |table, &coin| {
        (0..=amount).map(|i| {
            if i >= coin as usize { table[i].min(table[i - coin as usize] + 1) }
            else { table[i] }
        }).collect()
    });
    if result[amount] >= inf { -1 } else { result[amount] as i32 }
}

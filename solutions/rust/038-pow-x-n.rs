/**
 * Problem 38: Pow(x, n) (LeetCode 50)
 * Difficulty: Med
 * Language: Rust
 */
pub fn my_pow(x: f64, n: i32) -> f64 {
    match n {
        0 => 1.0,
        _ if n < 0 => my_pow(1.0 / x, -(n as i64) as i32),
        _ if n % 2 == 0 => my_pow(x * x, n / 2),
        _ => x * my_pow(x * x, (n - 1) / 2),
    }
}

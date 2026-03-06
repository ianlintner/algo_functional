/**
 * Problem 7: String to Integer (atoi) (LeetCode 8)
 * Difficulty: Med
 * Language: Rust
 */
pub fn my_atoi(s: String) -> i32 {
    let trimmed = s.trim_start();
    let (sign, rest) = match trimmed.chars().next() {
        Some('-') => (-1i64, &trimmed[1..]),
        Some('+') => (1i64, &trimmed[1..]),
        _ => (1i64, trimmed),
    };

    let value = rest
        .chars()
        .take_while(|c| c.is_ascii_digit())
        .fold(0i64, |acc, c| {
            (acc * 10 + c.to_digit(10).unwrap() as i64)
                .min(i32::MAX as i64 + 1)
        });

    let result = sign * value;
    result.max(i32::MIN as i64).min(i32::MAX as i64) as i32
}

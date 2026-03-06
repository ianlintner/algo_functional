/**
 * Problem 11: Roman to Integer (LeetCode 13)
 * Difficulty: Easy
 * Language: Rust
 */
pub fn roman_to_int(s: String) -> i32 {
    let value = |c| match c {
        'I' => 1, 'V' => 5, 'X' => 10, 'L' => 50,
        'C' => 100, 'D' => 500, 'M' => 1000, _ => 0,
    };
    s.chars().rev().fold((0, 0), |(total, prev), ch| {
        let v = value(ch);
        if v < prev { (total - v, v) } else { (total + v, v) }
    }).0
}

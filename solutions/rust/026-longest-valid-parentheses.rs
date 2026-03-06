/**
 * Problem 26: Longest Valid Parentheses (LeetCode 32)
 * Difficulty: Hard
 * Language: Rust
 */
pub fn longest_valid_parentheses(s: String) -> i32 {
    let chars: Vec<char> = s.chars().collect();
    let scan = |cs: &[char], open: char, close: char| -> i32 {
        cs.iter().fold((0i32, 0i32, 0i32), |(l, r, mx), &c| {
            let (l, r) = if c == open { (l + 1, r) } else { (l, r + 1) };
            if r > l { (0, 0, mx) }
            else if l == r { (l, r, mx.max(2 * r)) }
            else { (l, r, mx) }
        }).2
    };
    let rev: Vec<char> = chars.iter().rev().cloned().collect();
    scan(&chars, '(', ')').max(scan(&rev, ')', '('))
}

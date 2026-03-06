/**
 * Problem 151: Backspace String Compare (LeetCode 844)
 * Difficulty: Easy
 * Language: Rust
 */
fn backspace_compare(s: &str, t: &str) -> bool {
    let build = |input: &str| -> String {
        input.chars().fold(String::new(), |mut acc, ch| {
            if ch == '#' { acc.pop(); } else { acc.push(ch); }
            acc
        })
    };
    build(s) == build(t)
}

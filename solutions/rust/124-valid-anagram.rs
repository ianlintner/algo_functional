/**
 * Problem 124: Valid Anagram (LeetCode 242)
 * Difficulty: Easy
 * Language: Rust
 */
fn is_anagram(s: &str, t: &str) -> bool {
    let freq = |s: &str| -> Vec<(char, usize)> {
        let mut m = std::collections::HashMap::new();
        s.chars().for_each(|c| *m.entry(c).or_insert(0) += 1);
        let mut v: Vec<_> = m.into_iter().collect();
        v.sort(); v
    };
    freq(s) == freq(t)
}

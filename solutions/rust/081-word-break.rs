/**
 * Problem 81: Word Break (LeetCode 139)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashSet;
fn word_break(s: &str, word_dict: Vec<&str>) -> bool {
    let dict: HashSet<&str> = word_dict.into_iter().collect();
    let n = s.len();
    let dp = (0..=n).fold(vec![false; n + 1], |mut dp, i| {
        if i == 0 { dp[0] = true; }
        else { dp[i] = (0..i).any(|j| dp[j] && dict.contains(&s[j..i])); }
        dp
    });
    dp[n]
}

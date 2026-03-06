/**
 * Problem 94: Top K Frequent Words (LeetCode 692)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

fn top_k_frequent(words: &[&str], k: usize) -> Vec<String> {
    let mut freq = HashMap::new();
    for w in words { *freq.entry(*w).or_insert(0i32) += 1; }
    let mut pairs: Vec<_> = freq.into_iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(&b.0)));
    pairs.into_iter().take(k).map(|(w, _)| w.to_string()).collect()
}

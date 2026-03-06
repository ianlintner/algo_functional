/**
 * Problem 148: Palindrome Pairs (LeetCode 336)
 * Difficulty: Hard
 * Language: Rust
 */
fn palindrome_pairs(words: &[String]) -> Vec<[usize;2]> {
    use std::collections::HashMap;
    let is_palin = |s: &str| s.chars().eq(s.chars().rev());
    let map: HashMap<&str, usize> = words.iter().enumerate().map(|(i,w)| (w.as_str(),i)).collect();
    words.iter().enumerate().flat_map(|(i, w)| {
        (0..=w.len()).flat_map(move |j| {
            let (left, right) = w.split_at(j);
            let rev_l: String = left.chars().rev().collect();
            let rev_r: String = right.chars().rev().collect();
            let mut res = vec![];
            if is_palin(right) { if let Some(&k) = map.get(rev_l.as_str()) {
                if k != i { res.push([i, k]); }
            }}
            if j > 0 && is_palin(left) { if let Some(&k) = map.get(rev_r.as_str()) {
                if k != i { res.push([k, i]); }
            }}
            res
        }).collect::<Vec<_>>()
    }).collect()
}

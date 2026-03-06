/**
 * Problem 76: Word Ladder (LeetCode 127)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::{HashSet, VecDeque};
fn ladder_length(begin: &str, end: &str, word_list: Vec<&str>) -> i32 {
    let dict: HashSet<String> = word_list.into_iter().map(String::from).collect();
    if !dict.contains(end) { return 0; }
    let mut queue = VecDeque::from(vec![(begin.to_string(), 1)]);
    let mut visited = HashSet::new();
    visited.insert(begin.to_string());
    while let Some((word, depth)) = queue.pop_front() {
        if word == end { return depth; }
        let bytes = word.as_bytes();
        for i in 0..bytes.len() {
            for c in b'a'..=b'z' {
                let mut next = bytes.to_vec();
                next[i] = c;
                let ns = String::from_utf8(next).unwrap();
                if dict.contains(&ns) && visited.insert(ns.clone()) {
                    queue.push_back((ns, depth + 1));
                }
            }
        }
    }
    0
}

/**
 * Problem 130: Alien Dictionary (LeetCode 269)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::{HashMap, HashSet, VecDeque};
fn alien_order(words: &[&str]) -> String {
    let mut graph: HashMap<char, HashSet<char>> = HashMap::new();
    let mut in_deg: HashMap<char, usize> = HashMap::new();
    for w in words { for c in w.chars() {
        graph.entry(c).or_default(); in_deg.entry(c).or_insert(0);
    }}
    for pair in words.windows(2) {
        let (w1, w2) = (pair[0], pair[1]);
        if w1.len() > w2.len() && w1.starts_with(w2) { return String::new(); }
        for (a, b) in w1.chars().zip(w2.chars()) {
            if a != b {
                if graph.entry(a).or_default().insert(b) {
                    *in_deg.entry(b).or_insert(0) += 1;
                }
                break;
            }
        }
    }
    let mut queue: VecDeque<char> = in_deg.iter()
        .filter(|(_, &d)| d == 0).map(|(&c, _)| c).collect();
    let mut result = String::new();
    while let Some(c) = queue.pop_front() {
        result.push(c);
        for &nb in graph.get(&c).unwrap() {
            let d = in_deg.get_mut(&nb).unwrap();
            *d -= 1;
            if *d == 0 { queue.push_back(nb); }
        }
    }
    if result.len() == in_deg.len() { result } else { String::new() }
}

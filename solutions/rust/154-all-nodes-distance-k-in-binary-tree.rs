/**
 * Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::{HashMap, HashSet, VecDeque};
fn distance_k(adj: &HashMap<i32, Vec<i32>>, target: i32, k: i32) -> Vec<i32> {
    let mut visited = HashSet::new();
    let mut queue = VecDeque::new();
    queue.push_back((target, 0));
    visited.insert(target);
    let mut result = vec![];
    while let Some((node, dist)) = queue.pop_front() {
        if dist == k { result.push(node); }
        if dist < k {
            if let Some(neighbors) = adj.get(&node) {
                for &n in neighbors.iter().filter(|n| !visited.contains(n)) {
                    visited.insert(n);
                    queue.push_back((n, dist + 1));
                }
            }
        }
    }
    result
}

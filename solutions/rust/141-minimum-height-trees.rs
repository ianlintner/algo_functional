/**
 * Problem 141: Minimum Height Trees (LeetCode 310)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::{HashSet, VecDeque};
fn find_min_height_trees(n: usize, edges: &[(usize, usize)]) -> Vec<usize> {
    if n == 1 { return vec![0]; }
    let mut adj: Vec<HashSet<usize>> = vec![HashSet::new(); n];
    for &(u, v) in edges { adj[u].insert(v); adj[v].insert(u); }
    let mut leaves: Vec<usize> = (0..n).filter(|&i| adj[i].len() == 1).collect();
    let mut remaining = n;
    while remaining > 2 {
        remaining -= leaves.len();
        let mut new_leaves = vec![];
        for &leaf in &leaves {
            let nbs: Vec<usize> = adj[leaf].iter().copied().collect();
            for nb in nbs { adj[nb].remove(&leaf);
                if adj[nb].len() == 1 { new_leaves.push(nb); }
            }
        }
        leaves = new_leaves;
    }
    leaves
}

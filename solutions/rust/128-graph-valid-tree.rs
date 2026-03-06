/**
 * Problem 128: Graph Valid Tree (LeetCode 261)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::{HashMap, HashSet};
fn valid_tree(n: usize, edges: &[(usize, usize)]) -> bool {
    if edges.len() != n - 1 { return false; }
    let adj = edges.iter().fold(HashMap::new(), |mut g, &(u, v)| {
        g.entry(u).or_insert_with(Vec::new).push(v);
        g.entry(v).or_insert_with(Vec::new).push(u);
        g
    });
    fn dfs(node: usize, visited: &mut HashSet<usize>,
           adj: &HashMap<usize, Vec<usize>>) {
        if !visited.insert(node) { return; }
        if let Some(nbs) = adj.get(&node) {
            for &nb in nbs { dfs(nb, visited, adj); }
        }
    }
    let mut visited = HashSet::new();
    dfs(0, &mut visited, &adj);
    visited.len() == n
}

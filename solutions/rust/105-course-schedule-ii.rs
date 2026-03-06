/**
 * Problem 105: Course Schedule II (LeetCode 210)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::{HashMap, HashSet};

fn find_order(n: i32, prerequisites: Vec<Vec<i32>>) -> Vec<i32> {
    let graph = prerequisites.iter().fold(HashMap::new(), |mut g, p| {
        g.entry(p[1]).or_insert_with(Vec::new).push(p[0]); g
    });
    let mut path = HashSet::new();
    let mut done = HashSet::new();
    let mut order = Vec::new();
    let mut has_cycle = false;
    fn dfs(v: i32, g: &HashMap<i32, Vec<i32>>, path: &mut HashSet<i32>,
           done: &mut HashSet<i32>, order: &mut Vec<i32>, cycle: &mut bool) {
        if *cycle || done.contains(&v) { return; }
        if path.contains(&v) { *cycle = true; return; }
        path.insert(v);
        if let Some(nbs) = g.get(&v) {
            for &nb in nbs { dfs(nb, g, path, done, order, cycle); }
        }
        done.insert(v); order.push(v);
    }
    for i in 0..n { dfs(i, &graph, &mut path, &mut done, &mut order, &mut has_cycle); }
    if has_cycle { vec![] } else { order }
}

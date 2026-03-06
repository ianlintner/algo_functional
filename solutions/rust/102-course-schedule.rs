/**
 * Problem 102: Course Schedule (LeetCode 207)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::{HashMap, HashSet};

fn can_finish(n: i32, prerequisites: Vec<Vec<i32>>) -> bool {
    let graph = prerequisites.iter().fold(HashMap::new(), |mut g, p| {
        g.entry(p[1]).or_insert_with(Vec::new).push(p[0]); g
    });
    fn dfs(v: i32, g: &HashMap<i32, Vec<i32>>,
           path: &mut HashSet<i32>, done: &mut HashSet<i32>) -> bool {
        if done.contains(&v) { return false; }
        if path.contains(&v) { return true; }
        path.insert(v);
        let cyc = g.get(&v).map_or(false, |nbs|
            nbs.iter().any(|&nb| dfs(nb, g, path, done)));
        done.insert(v);
        cyc
    }
    let (mut path, mut done) = (HashSet::new(), HashSet::new());
    !(0..n).any(|i| dfs(i, &graph, &mut path, &mut done))
}

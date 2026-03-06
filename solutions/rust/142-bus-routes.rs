/**
 * Problem 142: Bus Routes (LeetCode 815)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::{HashMap, HashSet, VecDeque};
fn num_buses_to_destination(routes: &[Vec<i32>], source: i32, target: i32) -> i32 {
    if source == target { return 0; }
    let mut stop_to_routes: HashMap<i32, Vec<usize>> = HashMap::new();
    for (ri, route) in routes.iter().enumerate() {
        for &s in route { stop_to_routes.entry(s).or_default().push(ri); }
    }
    let mut visited = HashSet::new();
    let mut v_routes = HashSet::new();
    visited.insert(source);
    let mut queue = VecDeque::new();
    queue.push_back(source);
    let mut buses = 0;
    while !queue.is_empty() {
        let size = queue.len();
        for _ in 0..size {
            let stop = queue.pop_front().unwrap();
            if stop == target { return buses; }
            for &ri in stop_to_routes.get(&stop).unwrap_or(&vec![]) {
                if v_routes.insert(ri) {
                    for &ns in &routes[ri] {
                        if visited.insert(ns) { queue.push_back(ns); }
                    }
                }
            }
        }
        buses += 1;
    }
    -1
}

/**
 * Problem 71: Minimum Knight Moves (LeetCode 1197)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::{HashSet, VecDeque};
fn min_knight_moves(x: i32, y: i32) -> i32 {
    let (tx, ty) = (x.abs(), y.abs());
    let mut queue = VecDeque::from(vec![(0i32, 0i32, 0i32)]);
    let mut visited = HashSet::new();
    visited.insert((0, 0));
    let moves = [(1,2),(2,1),(2,-1),(1,-2),(-1,-2),(-2,-1),(-2,1),(-1,2)];
    while let Some((cx, cy, d)) = queue.pop_front() {
        if cx == tx && cy == ty { return d; }
        for &(dx, dy) in &moves {
            let (nx, ny) = (cx+dx, cy+dy);
            if nx >= -2 && ny >= -2 && visited.insert((nx, ny)) {
                queue.push_back((nx, ny, d+1));
            }
        }
    }
    -1
}

/**
 * Problem 31: Shortest Path to Get Food (LeetCode 1730)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::{HashSet, VecDeque};

pub fn get_food(grid: Vec<Vec<char>>) -> i32 {
    let (rows, cols) = (grid.len(), grid[0].len());
    let start = (0..rows).flat_map(|i| (0..cols).map(move |j| (i, j)))
        .find(|&(i, j)| grid[i][j] == '*').unwrap();
    let dirs = [(0i32,1i32),(0,-1),(1,0),(-1,0)];
    let mut queue = VecDeque::new();
    let mut visited = HashSet::new();
    queue.push_back((start.0, start.1, 0));
    visited.insert(start);
    while let Some((r, c, d)) = queue.pop_front() {
        for &(dr, dc) in &dirs {
            let (nr, nc) = (r as i32 + dr, c as i32 + dc);
            if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                let (nr, nc) = (nr as usize, nc as usize);
                if grid[nr][nc] != 'X' && visited.insert((nr, nc)) {
                    if grid[nr][nc] == '#' { return d + 1; }
                    queue.push_back((nr, nc, d + 1));
                }
            }
        }
    }
    -1
}

/**
 * Problem 10: Rotting Oranges (LeetCode 994)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::VecDeque;

pub fn oranges_rotting(mut grid: Vec<Vec<i32>>) -> i32 {
    let (rows, cols) = (grid.len(), grid[0].len());
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new();
    let mut fresh = 0;

    for r in 0..rows {
        for c in 0..cols {
            match grid[r][c] {
                2 => queue.push_back((r, c)),
                1 => fresh += 1,
                _ => {}
            }
        }
    }

    let dirs = [(0i32,1i32),(0,-1),(1,0),(-1,0)];
    let mut time = 0;
    while !queue.is_empty() && fresh > 0 {
        let size = queue.len();
        for _ in 0..size {
            let (r, c) = queue.pop_front().unwrap();
            for &(dr, dc) in &dirs {
                let (nr, nc) = (r as i32 + dr, c as i32 + dc);
                if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                    let (nr, nc) = (nr as usize, nc as usize);
                    if grid[nr][nc] == 1 {
                        grid[nr][nc] = 2;
                        fresh -= 1;
                        queue.push_back((nr, nc));
                    }
                }
            }
        }
        time += 1;
    }
    if fresh > 0 { -1 } else { time }
}

/**
 * Problem 100: Number of Islands (LeetCode 200)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashSet;

fn num_islands(grid: &[Vec<char>]) -> i32 {
    let (rows, cols) = (grid.len(), grid[0].len());
    fn flood(r: i32, c: i32, grid: &[Vec<char>], vis: &mut HashSet<(i32,i32)>,
             rows: i32, cols: i32) {
        if r < 0 || r >= rows || c < 0 || c >= cols { return; }
        if grid[r as usize][c as usize] != '1' || vis.contains(&(r, c)) { return; }
        vis.insert((r, c));
        for (dr, dc) in [(-1,0),(1,0),(0,-1),(0,1)] {
            flood(r+dr, c+dc, grid, vis, rows, cols);
        }
    }
    let mut vis = HashSet::new();
    let mut count = 0;
    for r in 0..rows as i32 {
        for c in 0..cols as i32 {
            if grid[r as usize][c as usize] == '1' && !vis.contains(&(r, c)) {
                count += 1;
                flood(r, c, grid, &mut vis, rows as i32, cols as i32);
            }
        }
    }
    count
}

/**
 * Problem 161: Pacific Atlantic Water Flow (LeetCode 417)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashSet;

fn pacific_atlantic(heights: &[Vec<i32>]) -> Vec<(usize, usize)> {
    let (rows, cols) = (heights.len(), heights[0].len());
    fn dfs(heights: &[Vec<i32>], visited: &mut HashSet<(usize, usize)>,
           r: usize, c: usize, rows: usize, cols: usize) {
        if !visited.insert((r, c)) { return; }
        for (dr, dc) in &[(0i32,1i32),(0,-1),(1,0),(-1,0)] {
            let (nr, nc) = (r as i32 + dr, c as i32 + dc);
            if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32 {
                let (nr, nc) = (nr as usize, nc as usize);
                if !visited.contains(&(nr, nc)) && heights[nr][nc] >= heights[r][c] {
                    dfs(heights, visited, nr, nc, rows, cols);
                }
            }
        }
    }
    let (mut pac, mut atl) = (HashSet::new(), HashSet::new());
    for r in 0..rows { dfs(heights, &mut pac, r, 0, rows, cols);
                        dfs(heights, &mut atl, r, cols-1, rows, cols); }
    for c in 0..cols { dfs(heights, &mut pac, 0, c, rows, cols);
                        dfs(heights, &mut atl, rows-1, c, rows, cols); }
    pac.intersection(&atl).copied().collect()
}

/**
 * Problem 146: Longest Increasing Path in a Matrix (LeetCode 329)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::HashMap;
fn longest_increasing_path(matrix: &Vec<Vec<i32>>) -> i32 {
    let (rows, cols) = (matrix.len(), matrix[0].len());
    let mut memo = HashMap::new();
    fn dfs(r: usize, c: usize, matrix: &Vec<Vec<i32>>, memo: &mut HashMap<(usize,usize),i32>,
           rows: usize, cols: usize) -> i32 {
        if let Some(&v) = memo.get(&(r,c)) { return v; }
        let best = [(0i32,1i32),(0,-1),(1,0),(-1,0)].iter().fold(0, |mx, &(dr,dc)| {
            let (nr, nc) = (r as i32 + dr, c as i32 + dc);
            if nr >= 0 && nr < rows as i32 && nc >= 0 && nc < cols as i32
               && matrix[nr as usize][nc as usize] > matrix[r][c] {
                mx.max(dfs(nr as usize, nc as usize, matrix, memo, rows, cols))
            } else { mx }
        });
        memo.insert((r,c), best + 1);
        best + 1
    }
    (0..rows).flat_map(|r| (0..cols).map(move |c| (r,c)))
        .fold(0, |mx, (r,c)| mx.max(dfs(r, c, &matrix, &mut memo, rows, cols)))
}

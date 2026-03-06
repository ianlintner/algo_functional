/**
 * Problem 24: 01 Matrix (LeetCode 542)
 * Difficulty: Med
 * Language: Rust
 */
pub fn update_matrix(mat: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let (rows, cols) = (mat.len(), mat[0].len());
    let inf = (rows + cols) as i32;
    let mut dist: Vec<Vec<i32>> = mat.iter().map(|row|
        row.iter().map(|&v| if v == 0 { 0 } else { inf }).collect()
    ).collect();

    // Top-left pass
    for r in 0..rows {
        for c in 0..cols {
            if r > 0 { dist[r][c] = dist[r][c].min(dist[r-1][c] + 1); }
            if c > 0 { dist[r][c] = dist[r][c].min(dist[r][c-1] + 1); }
        }
    }

    // Bottom-right pass
    for r in (0..rows).rev() {
        for c in (0..cols).rev() {
            if r < rows - 1 { dist[r][c] = dist[r][c].min(dist[r+1][c] + 1); }
            if c < cols - 1 { dist[r][c] = dist[r][c].min(dist[r][c+1] + 1); }
        }
    }
    dist
}

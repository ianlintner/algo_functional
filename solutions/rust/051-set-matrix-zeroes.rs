/**
 * Problem 51: Set Matrix Zeroes (LeetCode 73)
 * Difficulty: Med
 * Language: Rust
 */
pub fn set_zeroes(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let zero_rows: std::collections::HashSet<usize> = matrix.iter().enumerate()
        .filter(|(_, r)| r.contains(&0)).map(|(i, _)| i).collect();
    let cols = matrix[0].len();
    let zero_cols: std::collections::HashSet<usize> = (0..cols)
        .filter(|&j| matrix.iter().any(|r| r[j] == 0)).collect();
    matrix.iter().enumerate().map(|(i, row)|
        row.iter().enumerate().map(|(j, &v)|
            if zero_rows.contains(&i) || zero_cols.contains(&j) { 0 } else { v }
        ).collect()
    ).collect()
}

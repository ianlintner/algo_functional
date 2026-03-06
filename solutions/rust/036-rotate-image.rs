/**
 * Problem 36: Rotate Image (LeetCode 48)
 * Difficulty: Med
 * Language: Rust
 */
pub fn rotate(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let n = matrix.len();
    (0..n).map(|i|
        (0..n).rev().map(|j| matrix[j][i]).collect()
    ).collect()
}

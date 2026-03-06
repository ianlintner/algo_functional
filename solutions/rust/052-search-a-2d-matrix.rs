/**
 * Problem 52: Search a 2D Matrix (LeetCode 74)
 * Difficulty: Med
 * Language: Rust
 */
pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
    let flat: Vec<i32> = matrix.into_iter().flatten().collect();
    fn go(arr: &[i32], target: i32, lo: usize, hi: usize) -> bool {
        if lo > hi { return false; }
        let mid = lo + (hi - lo) / 2;
        if arr[mid] == target { true }
        else if arr[mid] < target { go(arr, target, mid + 1, hi) }
        else if mid == 0 { false }
        else { go(arr, target, lo, mid - 1) }
    }
    if flat.is_empty() { false }
    else { go(&flat, target, 0, flat.len() - 1) }
}

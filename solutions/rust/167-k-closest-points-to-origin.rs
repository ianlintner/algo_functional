/**
 * Problem 167: K Closest Points to Origin (LeetCode 973)
 * Difficulty: Med
 * Language: Rust
 */
fn k_closest(points: &mut Vec<Vec<i32>>, k: usize) -> Vec<Vec<i32>> {
    points.sort_by_key(|p| p[0] * p[0] + p[1] * p[1]);
    points[..k].to_vec()
}

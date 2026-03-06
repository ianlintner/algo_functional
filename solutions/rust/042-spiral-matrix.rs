/**
 * Problem 42: Spiral Matrix (LeetCode 54)
 * Difficulty: Med
 * Language: Rust
 */
pub fn spiral_order(matrix: Vec<Vec<i32>>) -> Vec<i32> {
    fn go(m: Vec<Vec<i32>>) -> Vec<i32> {
        if m.is_empty() || m[0].is_empty() { return vec![]; }
        let mut result = m[0].clone();
        let rest: Vec<Vec<i32>> = m[1..].to_vec();
        let rotated = rotate(rest);
        result.extend(go(rotated));
        result
    }
    fn rotate(m: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        if m.is_empty() || m[0].is_empty() { return vec![]; }
        (0..m[0].len()).map(|i|
            m.iter().map(|r| r[i]).rev().collect()
        ).collect()
    }
    go(matrix)
}

/**
 * Problem 34: Trapping Rain Water (LeetCode 42)
 * Difficulty: Hard
 * Language: Rust
 */
pub fn trap(height: Vec<i32>) -> i32 {
    let n = height.len();
    if n == 0 { return 0; }
    let max_left: Vec<i32> = height.iter()
        .scan(0, |mx, &h| { *mx = (*mx).max(h); Some(*mx) }).collect();
    let max_right: Vec<i32> = height.iter().rev()
        .scan(0, |mx, &h| { *mx = (*mx).max(h); Some(*mx) })
        .collect::<Vec<_>>().into_iter().rev().collect();
    height.iter().enumerate()
        .map(|(i, &h)| (max_left[i].min(max_right[i]) - h).max(0))
        .sum()
}

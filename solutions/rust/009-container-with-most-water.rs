/**
 * Problem 9: Container With Most Water (LeetCode 11)
 * Difficulty: Med
 * Language: Rust
 */
pub fn max_area(height: Vec<i32>) -> i32 {
    fn solve(h: &[i32], l: usize, r: usize, best: i32) -> i32 {
        if l >= r { return best; }
        let area = h[l].min(h[r]) * (r - l) as i32;
        let new_best = best.max(area);
        if h[l] < h[r] {
            solve(h, l + 1, r, new_best)
        } else {
            solve(h, l, r - 1, new_best)
        }
    }
    solve(&height, 0, height.len() - 1, 0)
}

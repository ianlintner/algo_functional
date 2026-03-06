/**
 * Problem 47: Rotate List (LeetCode 61)
 * Difficulty: Med
 * Language: Rust
 */
pub fn rotate_right(list: Vec<i32>, k: i32) -> Vec<i32> {
    if list.is_empty() { return vec![]; }
    let n = list.len();
    let rot = (k as usize) % n;
    if rot == 0 { return list; }
    [&list[n - rot..], &list[..n - rot]].concat()
}

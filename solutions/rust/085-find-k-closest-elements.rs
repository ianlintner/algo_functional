/**
 * Problem 85: Find K Closest Elements (LeetCode 658)
 * Difficulty: Med
 * Language: Rust
 */
fn find_closest_elements(arr: &[i32], k: usize, x: i32) -> Vec<i32> {
    let (mut lo, mut hi) = (0usize, arr.len());
    while hi - lo > k {
        if (arr[lo] - x).abs() <= (arr[hi - 1] - x).abs() { hi -= 1; }
        else { lo += 1; }
    }
    arr[lo..hi].to_vec()
}

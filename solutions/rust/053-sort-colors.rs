/**
 * Problem 53: Sort Colors (LeetCode 75)
 * Difficulty: Med
 * Language: Rust
 */
pub fn sort_colors(nums: Vec<i32>) -> Vec<i32> {
    let counts = nums.iter().fold([0usize; 3], |mut c, &n| {
        c[n as usize] += 1; c
    });
    (0..3).flat_map(|i| vec![i as i32; counts[i]]).collect()
}

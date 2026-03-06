/**
 * Problem 35: Permutations (LeetCode 46)
 * Difficulty: Med
 * Language: Rust
 */
pub fn permute(nums: Vec<i32>) -> Vec<Vec<i32>> {
    if nums.is_empty() { return vec![vec![]]; }
    nums.iter().enumerate().flat_map(|(i, &n)| {
        let rest: Vec<i32> = nums.iter().enumerate()
            .filter(|&(j, _)| j != i).map(|(_, &v)| v).collect();
        permute(rest).into_iter().map(move |mut p| { p.insert(0, n); p })
    }).collect()
}

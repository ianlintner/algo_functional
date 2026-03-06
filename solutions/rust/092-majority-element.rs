/**
 * Problem 92: Majority Element (LeetCode 169)
 * Difficulty: Easy
 * Language: Rust
 */
fn majority_element(nums: &[i32]) -> i32 {
    nums.iter().fold((0, 0), |(cand, count), &n| {
        if count == 0 { (n, 1) }
        else if n == cand { (cand, count + 1) }
        else { (cand, count - 1) }
    }).0
}

/**
 * Problem 93: Largest Number (LeetCode 179)
 * Difficulty: Med
 * Language: Rust
 */
fn largest_number(nums: &[i32]) -> String {
    let mut strs: Vec<String> = nums.iter().map(|n| n.to_string()).collect();
    strs.sort_by(|a, b| format!("{}{}", b, a).cmp(&format!("{}{}", a, b)));
    let res = strs.join("");
    if res.starts_with('0') { "0".to_string() } else { res }
}

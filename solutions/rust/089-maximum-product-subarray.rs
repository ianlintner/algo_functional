/**
 * Problem 89: Maximum Product Subarray (LeetCode 152)
 * Difficulty: Med
 * Language: Rust
 */
fn max_product(nums: &[i32]) -> i32 {
    let (best, _, _) = nums[1..].iter().fold(
        (nums[0], nums[0], nums[0]),
        |(best, mx, mn), &n| {
            let hi = n.max(mx * n).max(mn * n);
            let lo = n.min(mx * n).min(mn * n);
            (best.max(hi), hi, lo)
        },
    );
    best
}

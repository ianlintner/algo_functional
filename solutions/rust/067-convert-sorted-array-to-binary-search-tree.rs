/**
 * Problem 67: Convert Sorted Array to Binary Search Tree (LeetCode 108)
 * Difficulty: Easy
 * Language: Rust
 */
fn sorted_array_to_bst(nums: &[i32]) -> Option<Box<TreeNode>> {
    if nums.is_empty() { return None; }
    let mid = nums.len() / 2;
    Some(Box::new(TreeNode {
        val: nums[mid] as i64,
        left: sorted_array_to_bst(&nums[..mid]),
        right: sorted_array_to_bst(&nums[mid+1..]),
    }))
}

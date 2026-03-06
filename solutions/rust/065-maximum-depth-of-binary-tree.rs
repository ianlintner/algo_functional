/**
 * Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
 * Difficulty: Easy
 * Language: Rust
 */
fn max_depth(root: &Option<Box<TreeNode>>) -> i32 {
    match root {
        None => 0,
        Some(n) => 1 + max_depth(&n.left).max(max_depth(&n.right)),
    }
}

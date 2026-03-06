/**
 * Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
 * Difficulty: Med
 * Language: Rust
 */
fn lca(root: &Option<Box<TreeNode>>, p: i32, q: i32) -> Option<i32> {
    match root {
        None => None,
        Some(node) => {
            if node.val == p || node.val == q { return Some(node.val); }
            let left = lca(&node.left, p, q);
            let right = lca(&node.right, p, q);
            match (left, right) {
                (Some(_), Some(_)) => Some(node.val),
                (Some(x), None) | (None, Some(x)) => Some(x),
                _ => None,
            }
        }
    }
}

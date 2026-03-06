/**
 * Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
 * Difficulty: Med
 * Language: Rust
 */
fn lca_bst(root: &Option<Box<TreeNode>>, p: i32, q: i32) -> Option<i32> {
    match root {
        None => None,
        Some(node) => {
            if p < node.val && q < node.val { lca_bst(&node.left, p, q) }
            else if p > node.val && q > node.val { lca_bst(&node.right, p, q) }
            else { Some(node.val) }
        }
    }
}

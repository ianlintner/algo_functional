/**
 * Problem 60: Validate Binary Search Tree (LeetCode 98)
 * Difficulty: Med
 * Language: Rust
 */
#[derive(Debug)]
struct TreeNode { val: i64, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }

fn is_valid_bst(node: &Option<Box<TreeNode>>, lo: i64, hi: i64) -> bool {
    match node {
        None => true,
        Some(n) => n.val > lo && n.val < hi
            && is_valid_bst(&n.left, lo, n.val)
            && is_valid_bst(&n.right, n.val, hi),
    }
}

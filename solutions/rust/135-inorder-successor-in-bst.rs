/**
 * Problem 135: Inorder Successor in BST (LeetCode 285)
 * Difficulty: Med
 * Language: Rust
 */
#[derive(Debug)]
struct TreeNode { val: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }
fn inorder_successor(root: &Option<Box<TreeNode>>, p: i32) -> Option<i32> {
    match root {
        None => None,
        Some(node) if node.val > p =>
            inorder_successor(&node.left, p).or(Some(node.val)),
        Some(node) => inorder_successor(&node.right, p),
    }
}

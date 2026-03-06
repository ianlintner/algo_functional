/**
 * Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
 * Difficulty: Med
 * Language: Rust
 */
fn build_tree(preorder: &[i32], inorder: &[i32]) -> Option<Box<TreeNode>> {
    if preorder.is_empty() { return None; }
    let root_val = preorder[0];
    let mid = inorder.iter().position(|&x| x == root_val).unwrap();
    Some(Box::new(TreeNode {
        val: root_val as i64,
        left: build_tree(&preorder[1..=mid], &inorder[..mid]),
        right: build_tree(&preorder[mid+1..], &inorder[mid+1..]),
    }))
}

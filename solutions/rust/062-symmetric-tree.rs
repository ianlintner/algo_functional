/**
 * Problem 62: Symmetric Tree (LeetCode 101)
 * Difficulty: Easy
 * Language: Rust
 */
fn is_symmetric(root: &Option<Box<TreeNode>>) -> bool {
    fn mirror(a: &Option<Box<TreeNode>>, b: &Option<Box<TreeNode>>) -> bool {
        match (a, b) {
            (None, None) => true,
            (Some(x), Some(y)) =>
                x.val == y.val && mirror(&x.left, &y.right) && mirror(&x.right, &y.left),
            _ => false,
        }
    }
    match root {
        None => true,
        Some(n) => mirror(&n.left, &n.right),
    }
}

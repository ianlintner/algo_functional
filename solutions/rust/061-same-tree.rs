/**
 * Problem 61: Same Tree (LeetCode 100)
 * Difficulty: Easy
 * Language: Rust
 */
fn is_same_tree(p: &Option<Box<TreeNode>>, q: &Option<Box<TreeNode>>) -> bool {
    match (p, q) {
        (None, None) => true,
        (Some(a), Some(b)) =>
            a.val == b.val &&
            is_same_tree(&a.left, &b.left) &&
            is_same_tree(&a.right, &b.right),
        _ => false,
    }
}

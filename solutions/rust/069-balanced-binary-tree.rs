/**
 * Problem 69: Balanced Binary Tree (LeetCode 110)
 * Difficulty: Easy
 * Language: Rust
 */
fn is_balanced(root: &Option<Box<TreeNode>>) -> bool {
    fn height(node: &Option<Box<TreeNode>>) -> i32 {
        match node {
            None => 0,
            Some(n) => {
                let l = height(&n.left);
                let r = height(&n.right);
                if l == -1 || r == -1 || (l - r).abs() > 1 { -1 }
                else { 1 + l.max(r) }
            }
        }
    }
    height(root) != -1
}

/**
 * Problem 117: Kth Smallest Element in a BST (LeetCode 230)
 * Difficulty: Med
 * Language: Rust
 */
#[derive(Debug)]
struct TreeNode { val: i32, left: Option<Box<TreeNode>>, right: Option<Box<TreeNode>> }

fn kth_smallest(root: &Option<Box<TreeNode>>, k: usize) -> i32 {
    fn inorder(node: &Option<Box<TreeNode>>) -> Vec<i32> {
        match node {
            None => vec![],
            Some(n) => {
                let mut res = inorder(&n.left);
                res.push(n.val);
                res.extend(inorder(&n.right));
                res
            }
        }
    }
    inorder(root)[k - 1]
}

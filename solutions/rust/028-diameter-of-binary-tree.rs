/**
 * Problem 28: Diameter of Binary Tree (LeetCode 543)
 * Difficulty: Easy
 * Language: Rust
 */
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
pub struct TreeNode {
    pub val: i32,
    pub left: Option<Rc<RefCell<TreeNode>>>,
    pub right: Option<Rc<RefCell<TreeNode>>>,
}

pub fn diameter_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
    fn dfs(node: &Option<Rc<RefCell<TreeNode>>>) -> (i32, i32) {
        match node {
            None => (0, 0),
            Some(n) => {
                let n = n.borrow();
                let (lh, ld) = dfs(&n.left);
                let (rh, rd) = dfs(&n.right);
                (1 + lh.max(rh), (lh + rh).max(ld).max(rd))
            }
        }
    }
    dfs(&root).1
}

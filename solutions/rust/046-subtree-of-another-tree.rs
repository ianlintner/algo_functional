/**
 * Problem 46: Subtree of Another Tree (LeetCode 572)
 * Difficulty: Easy
 * Language: Rust
 */
use std::rc::Rc;
use std::cell::RefCell;
type Node = Option<Rc<RefCell<TreeNode>>>;

pub fn is_subtree(root: Node, sub: Node) -> bool {
    fn same(a: &Node, b: &Node) -> bool {
        match (a, b) {
            (None, None) => true,
            (Some(a), Some(b)) => {
                let (a, b) = (a.borrow(), b.borrow());
                a.val == b.val && same(&a.left, &b.left) && same(&a.right, &b.right)
            }
            _ => false,
        }
    }
    fn check(root: &Node, sub: &Node) -> bool {
        match root {
            None => sub.is_none(),
            Some(r) => {
                let r = r.borrow();
                same(root, sub) || check(&r.left, sub) || check(&r.right, sub)
            }
        }
    }
    check(&root, &sub)
}

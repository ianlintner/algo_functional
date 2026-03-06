/**
 * Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
 * Difficulty: Hard
 * Language: Rust
 */
use std::cell::RefCell;
use std::rc::Rc;
type Node = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i32, left: Node, right: Node }
fn serialize(root: &Node) -> String {
    match root {
        None => "null".to_string(),
        Some(n) => {
            let n = n.borrow();
            format!("{},{},{}", n.val, serialize(&n.left), serialize(&n.right))
        }
    }
}
fn deserialize(data: &str) -> Node {
    let tokens: Vec<&str> = data.split(',').collect();
    fn build(tokens: &[&str], i: usize) -> (Node, usize) {
        if tokens[i] == "null" { return (None, i + 1); }
        let val: i32 = tokens[i].parse().unwrap();
        let (left, i1) = build(tokens, i + 1);
        let (right, i2) = build(tokens, i1);
        (Some(Rc::new(RefCell::new(TreeNode { val, left, right }))), i2)
    }
    build(&tokens, 0).0
}

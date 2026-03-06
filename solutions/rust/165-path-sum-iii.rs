/**
 * Problem 165: Path Sum III (LeetCode 437)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

type TreeLink = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i32, left: TreeLink, right: TreeLink }

fn path_sum(root: &TreeLink, target: i64) -> i32 {
    fn dfs(node: &TreeLink, prefix: &mut HashMap<i64, i32>, curr: i64, target: i64) -> i32 {
        match node {
            None => 0,
            Some(n) => {
                let n = n.borrow();
                let sum = curr + n.val as i64;
                let count = *prefix.get(&(sum - target)).unwrap_or(&0);
                *prefix.entry(sum).or_insert(0) += 1;
                let res = count + dfs(&n.left, prefix, sum, target)
                                + dfs(&n.right, prefix, sum, target);
                *prefix.get_mut(&sum).unwrap() -= 1;
                res
            }
        }
    }
    let mut prefix = HashMap::from([(0i64, 1)]);
    dfs(root, &mut prefix, 0, target)
}

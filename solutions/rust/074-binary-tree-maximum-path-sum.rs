/**
 * Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
 * Difficulty: Hard
 * Language: Rust
 */
fn max_path_sum(root: &Option<Box<TreeNode>>) -> i64 {
    fn go(node: &Option<Box<TreeNode>>) -> (i64, i64) {
        match node {
            None => (0, i64::MIN),
            Some(n) => {
                let (lg, lm) = go(&n.left);
                let (rg, rm) = go(&n.right);
                let gain = 0i64.max(n.val as i64 + lg.max(rg));
                let path_max = *[lm, rm, n.val as i64 + lg + rg].iter().max().unwrap();
                (gain, path_max)
            }
        }
    }
    go(root).1
}

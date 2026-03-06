/**
 * Problem 70: Path Sum II (LeetCode 113)
 * Difficulty: Med
 * Language: Rust
 */
fn path_sum(root: &Option<Box<TreeNode>>, target: i64) -> Vec<Vec<i64>> {
    match root {
        None => vec![],
        Some(n) => {
            let v = n.val;
            if n.left.is_none() && n.right.is_none() {
                if v == target { vec![vec![v]] } else { vec![] }
            } else {
                let remain = target - v;
                let mut paths = path_sum(&n.left, remain);
                paths.extend(path_sum(&n.right, remain));
                paths.iter().map(|p| {
                    let mut r = vec![v];
                    r.extend(p);
                    r
                }).collect()
            }
        }
    }
}

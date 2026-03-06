/**
 * Problem 99: Binary Tree Right Side View (LeetCode 199)
 * Difficulty: Med
 * Language: Rust
 */
fn right_side_view(root: &Option<Box<TreeNode>>) -> Vec<i32> {
    fn bfs(level: Vec<&TreeNode>) -> Vec<i32> {
        if level.is_empty() { return vec![]; }
        let last = level.last().unwrap().val;
        let next: Vec<_> = level.iter().flat_map(|n| {
            let mut v = vec![];
            if let Some(ref l) = n.left { v.push(l.as_ref()); }
            if let Some(ref r) = n.right { v.push(r.as_ref()); }
            v
        }).collect();
        let mut res = vec![last];
        res.extend(bfs(next));
        res
    }
    match root { None => vec![], Some(r) => bfs(vec![r.as_ref()]) }
}

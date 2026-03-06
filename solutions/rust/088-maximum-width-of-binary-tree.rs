/**
 * Problem 88: Maximum Width of Binary Tree (LeetCode 662)
 * Difficulty: Med
 * Language: Rust
 */
// Uses Vec<(index, &Node)> for functional BFS
fn width_of_binary_tree(root: &Option<Box<Node>>) -> u64 {
    fn bfs(level: Vec<(&Node, u64)>, max_w: u64) -> u64 {
        if level.is_empty() { return max_w; }
        let w = level.last().unwrap().1 - level[0].1 + 1;
        let next: Vec<_> = level.iter().flat_map(|(n, i)| {
            let mut v = vec![];
            if let Some(ref l) = n.left { v.push((l.as_ref(), 2 * i)); }
            if let Some(ref r) = n.right { v.push((r.as_ref(), 2 * i + 1)); }
            v
        }).collect();
        bfs(next, w.max(max_w))
    }
    match root {
        None => 0,
        Some(r) => bfs(vec![(r.as_ref(), 0)], 0),
    }
}

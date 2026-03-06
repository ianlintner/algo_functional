/**
 * Problem 64: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
 * Difficulty: Med
 * Language: Rust
 */
fn zigzag_level_order(root: &Option<Box<TreeNode>>) -> Vec<Vec<i32>> {
    let mut result = vec![];
    let mut queue: Vec<&TreeNode> = match root {
        None => return result,
        Some(n) => vec![n.as_ref()],
    };
    let mut level = 0;
    while !queue.is_empty() {
        let mut vals: Vec<i32> = queue.iter().map(|n| n.val as i32).collect();
        if level % 2 == 1 { vals.reverse(); }
        result.push(vals);
        queue = queue.iter().flat_map(|n| {
            let mut ch = vec![];
            if let Some(ref l) = n.left { ch.push(l.as_ref()); }
            if let Some(ref r) = n.right { ch.push(r.as_ref()); }
            ch
        }).collect();
        level += 1;
    }
    result
}

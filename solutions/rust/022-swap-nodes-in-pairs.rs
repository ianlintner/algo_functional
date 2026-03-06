/**
 * Problem 22: Swap Nodes in Pairs (LeetCode 24)
 * Difficulty: Med
 * Language: Rust
 */
pub fn swap_pairs(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    match head {
        None => None,
        Some(a) => match a.next {
            None => Some(a),
            Some(b) => Some(Box::new(ListNode {
                val: b.val,
                next: Some(Box::new(ListNode {
                    val: a.val,
                    next: swap_pairs(b.next),
                })),
            })),
        },
    }
}

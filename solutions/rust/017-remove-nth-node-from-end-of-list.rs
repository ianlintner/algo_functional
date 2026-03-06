/**
 * Problem 17: Remove Nth Node From End of List (LeetCode 19)
 * Difficulty: Med
 * Language: Rust
 */
pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
    let mut vals: Vec<i32> = Vec::new();
    let mut curr = &head;
    while let Some(node) = curr {
        vals.push(node.val);
        curr = &node.next;
    }
    let idx = vals.len() - n as usize;
    vals.remove(idx);
    vals.into_iter().rev().fold(None, |next, val| {
        Some(Box::new(ListNode { val, next }))
    })
}

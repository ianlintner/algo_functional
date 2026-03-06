/**
 * Problem 82: Linked List Cycle (LeetCode 141)
 * Difficulty: Easy
 * Language: Rust
 */
fn has_cycle(head: Option<&ListNode>) -> bool {
    let mut slow = head;
    let mut fast = head;
    loop {
        slow = slow.and_then(|n| n.next.as_deref());
        fast = fast.and_then(|n| n.next.as_deref())
                   .and_then(|n| n.next.as_deref());
        match (slow, fast) {
            (Some(s), Some(f)) if std::ptr::eq(s, f) => return true,
            (_, None) => return false,
            _ => {}
        }
    }
}

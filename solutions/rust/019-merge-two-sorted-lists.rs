/**
 * Problem 19: Merge Two Sorted Lists (LeetCode 21)
 * Difficulty: Easy
 * Language: Rust
 */
pub fn merge_two_lists(
    l1: Option<Box<ListNode>>,
    l2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    match (l1, l2) {
        (None, r) => r,
        (l, None) => l,
        (Some(a), Some(b)) => {
            if a.val <= b.val {
                Some(Box::new(ListNode {
                    val: a.val,
                    next: merge_two_lists(a.next, Some(b)),
                }))
            } else {
                Some(Box::new(ListNode {
                    val: b.val,
                    next: merge_two_lists(Some(a), b.next),
                }))
            }
        }
    }
}

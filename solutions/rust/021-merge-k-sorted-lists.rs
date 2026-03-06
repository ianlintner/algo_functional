/**
 * Problem 21: Merge k Sorted Lists (LeetCode 23)
 * Difficulty: Hard
 * Language: Rust
 */
pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
    fn merge(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        match (l1, l2) {
            (None, r) => r,
            (l, None) => l,
            (Some(a), Some(b)) if a.val <= b.val =>
                Some(Box::new(ListNode { val: a.val, next: merge(a.next, Some(b)) })),
            (Some(a), Some(b)) =>
                Some(Box::new(ListNode { val: b.val, next: merge(Some(a), b.next) })),
        }
    }
    lists.into_iter().fold(None, |acc, list| merge(acc, list))
}

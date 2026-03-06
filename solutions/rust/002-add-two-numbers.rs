/**
 * Problem 2: Add Two Numbers (LeetCode 2)
 * Difficulty: Med
 * Language: Rust
 */
#[derive(Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

pub fn add_two_numbers(
    l1: Option<Box<ListNode>>,
    l2: Option<Box<ListNode>>,
) -> Option<Box<ListNode>> {
    fn add(
        n1: Option<Box<ListNode>>,
        n2: Option<Box<ListNode>>,
        carry: i32,
    ) -> Option<Box<ListNode>> {
        match (n1, n2, carry) {
            (None, None, 0) => None,
            (n1, n2, carry) => {
                let v1 = n1.as_ref().map_or(0, |n| n.val);
                let v2 = n2.as_ref().map_or(0, |n| n.val);
                let sum = v1 + v2 + carry;
                Some(Box::new(ListNode {
                    val: sum % 10,
                    next: add(
                        n1.and_then(|n| n.next),
                        n2.and_then(|n| n.next),
                        sum / 10,
                    ),
                }))
            }
        }
    }
    add(l1, l2, 0)
}

/**
 * Problem 145: Odd Even Linked List (LeetCode 328)
 * Difficulty: Med
 * Language: Rust
 */
#[derive(Debug)]
struct ListNode { val: i32, next: Option<Box<ListNode>> }
fn odd_even_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
    fn collect(node: &Option<Box<ListNode>>, is_odd: bool,
               odds: &mut Vec<i32>, evens: &mut Vec<i32>) {
        if let Some(n) = node {
            if is_odd { odds.push(n.val); } else { evens.push(n.val); }
            collect(&n.next, !is_odd, odds, evens);
        }
    }
    fn build(vals: &[i32]) -> Option<Box<ListNode>> {
        vals.iter().rev().fold(None, |next, &v|
            Some(Box::new(ListNode { val: v, next })))
    }
    let (mut odds, mut evens) = (vec![], vec![]);
    collect(&head, true, &mut odds, &mut evens);
    odds.extend(evens);
    build(&odds)
}

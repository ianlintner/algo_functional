/**
 * Problem 157: Middle of the Linked List (LeetCode 876)
 * Difficulty: Easy
 * Language: Rust
 */
#[derive(Clone)]
struct ListNode { val: i32, next: Option<Box<ListNode>> }
fn middle_node(head: &Option<Box<ListNode>>) -> Option<&ListNode> {
    let nodes: Vec<&ListNode> = std::iter::successors(head.as_deref(), |n| n.next.as_deref()).collect();
    nodes.get(nodes.len() / 2).copied()
}

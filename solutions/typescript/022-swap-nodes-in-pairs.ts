/**
 * Problem 22: Swap Nodes in Pairs (LeetCode 24)
 * Difficulty: Med
 * Language: TypeScript
 */
function swapPairs(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const second = head.next;
  return new ListNode(
    second.val,
    new ListNode(head.val, swapPairs(second.next))
  );
}

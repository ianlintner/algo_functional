/**
 * Problem 19: Merge Two Sorted Lists (LeetCode 21)
 * Difficulty: Easy
 * Language: TypeScript
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if (!l1) return l2;
  if (!l2) return l1;
  if (l1.val <= l2.val) {
    return new ListNode(l1.val, mergeTwoLists(l1.next, l2));
  }
  return new ListNode(l2.val, mergeTwoLists(l1, l2.next));
}

/**
 * Problem 2: Add Two Numbers (LeetCode 2)
 * Difficulty: Med
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

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const addHelper = (
    n1: ListNode | null,
    n2: ListNode | null,
    carry: number
  ): ListNode | null => {
    if (!n1 && !n2 && carry === 0) return null;
    const sum = (n1?.val ?? 0) + (n2?.val ?? 0) + carry;
    return new ListNode(
      sum % 10,
      addHelper(n1?.next ?? null, n2?.next ?? null, Math.floor(sum / 10))
    );
  };
  return addHelper(l1, l2, 0);
}

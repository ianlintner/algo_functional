/**
 * Problem 82: Linked List Cycle (LeetCode 141)
 * Difficulty: Easy
 * Language: TypeScript
 */
type ListNode = { val: number; next: ListNode | null };

function hasCycle(head: ListNode | null): boolean {
  const detect = (slow: ListNode | null, fast: ListNode | null): boolean => {
    if (!fast || !fast.next) return false;
    if (slow === fast) return true;
    return detect(slow!.next, fast.next.next);
  };
  return head ? detect(head, head.next) : false;
}

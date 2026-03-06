/**
 * Problem 101: Reverse Linked List (LeetCode 206)
 * Difficulty: Easy
 * Language: TypeScript
 */
type LNode = { val: number; next: LNode | null };
function reverseList(head: LNode | null): LNode | null {
  const go = (node: LNode | null, acc: LNode | null): LNode | null =>
    node === null ? acc : go(node.next, { val: node.val, next: acc });
  return go(head, null);
}

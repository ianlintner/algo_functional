/**
 * Problem 157: Middle of the Linked List (LeetCode 876)
 * Difficulty: Easy
 * Language: TypeScript
 */
interface ListNode { val: number; next: ListNode | null; }
function middleNode(head: ListNode | null): ListNode | null {
  const nodes = (function collect(n: ListNode | null): ListNode[] {
    return n === null ? [] : [n, ...collect(n.next)];
  })(head);
  return nodes[Math.floor(nodes.length / 2)] ?? null;
}

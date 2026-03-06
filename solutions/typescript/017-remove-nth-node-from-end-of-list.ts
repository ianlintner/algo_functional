/**
 * Problem 17: Remove Nth Node From End of List (LeetCode 19)
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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const toList = (node: ListNode | null): number[] =>
    node === null ? [] : [node.val, ...toList(node.next)];

  const fromList = (arr: number[]): ListNode | null =>
    arr.reduceRight<ListNode | null>((next, val) => new ListNode(val, next), null);

  const items = toList(head);
  const filtered = items.filter((_, i) => i !== items.length - n);
  return fromList(filtered);
}

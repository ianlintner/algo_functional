/**
 * Problem 23: Reverse Nodes in k-Group (LeetCode 25)
 * Difficulty: Hard
 * Language: TypeScript
 */
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  const toList = (node: ListNode | null): number[] =>
    node === null ? [] : [node.val, ...toList(node.next)];

  const fromList = (arr: number[]): ListNode | null =>
    arr.reduceRight<ListNode | null>((next, val) => new ListNode(val, next), null);

  const items = toList(head);

  const process = (arr: number[]): number[] => {
    if (arr.length < k) return arr;
    const group = arr.slice(0, k).reverse();
    return [...group, ...process(arr.slice(k))];
  };

  return fromList(process(items));
}

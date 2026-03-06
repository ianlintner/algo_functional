/**
 * Problem 145: Odd Even Linked List (LeetCode 328)
 * Difficulty: Med
 * Language: TypeScript
 */
interface ListNode { val: number; next: ListNode | null; }
function oddEvenList(head: ListNode | null): ListNode | null {
  const collect = (node: ListNode | null, isOdd: boolean, odds: number[], evens: number[]): [number[], number[]] => {
    if (!node) return [odds, evens];
    return isOdd
      ? collect(node.next, false, [...odds, node.val], evens)
      : collect(node.next, true, odds, [...evens, node.val]);
  };
  const [odds, evens] = collect(head, true, [], []);
  const build = (vals: number[]): ListNode | null =>
    vals.reduceRight<ListNode | null>((next, val) => ({ val, next }), null);
  return build([...odds, ...evens]);
}

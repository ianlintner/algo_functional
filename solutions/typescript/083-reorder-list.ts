/**
 * Problem 83: Reorder List (LeetCode 143)
 * Difficulty: Med
 * Language: TypeScript
 */
function reorderList(head: number[]): number[] {
  if (head.length <= 2) return head;
  const mid = Math.floor(head.length / 2);
  const first = head.slice(0, mid);
  const second = head.slice(mid).reverse();
  const merge = (a: number[], b: number[]): number[] =>
    a.length === 0 ? b : b.length === 0 ? a : [a[0], b[0], ...merge(a.slice(1), b.slice(1))];
  return merge(first, second);
}

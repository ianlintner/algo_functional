/**
 * Problem 86: Sort List (LeetCode 148)
 * Difficulty: Med
 * Language: TypeScript
 */
// Merge sort on linked list – purely functional
type LNode = { val: number; next: LNode | null };

function sortList(head: LNode | null): LNode | null {
  if (!head || !head.next) return head;
  const toList = (h: LNode | null): number[] =>
    h ? [h.val, ...toList(h.next)] : [];
  const fromList = (xs: number[]): LNode | null =>
    xs.reduceRight<LNode | null>((acc, v) => ({ val: v, next: acc }), null);
  const merge = (a: number[], b: number[]): number[] =>
    a.length === 0 ? b : b.length === 0 ? a
    : a[0] <= b[0] ? [a[0], ...merge(a.slice(1), b)]
    : [b[0], ...merge(a, b.slice(1))];
  const msort = (xs: number[]): number[] => {
    if (xs.length <= 1) return xs;
    const mid = Math.floor(xs.length / 2);
    return merge(msort(xs.slice(0, mid)), msort(xs.slice(mid)));
  };
  return fromList(msort(toList(head)));
}

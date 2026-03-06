/**
 * Problem 21: Merge k Sorted Lists (LeetCode 23)
 * Difficulty: Hard
 * Language: TypeScript
 */
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  const merge = (
    l1: ListNode | null,
    l2: ListNode | null
  ): ListNode | null => {
    if (!l1) return l2;
    if (!l2) return l1;
    if (l1.val <= l2.val) return new ListNode(l1.val, merge(l1.next, l2));
    return new ListNode(l2.val, merge(l1, l2.next));
  };

  return lists.reduce<ListNode | null>(
    (acc, list) => merge(acc, list),
    null
  );
}

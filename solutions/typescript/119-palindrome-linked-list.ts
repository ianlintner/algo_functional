/**
 * Problem 119: Palindrome Linked List (LeetCode 234)
 * Difficulty: Easy
 * Language: TypeScript
 */
function isPalindromeList(head: { val: number; next: any } | null): boolean {
  const toArray = (node: any): number[] =>
    node === null ? [] : [node.val, ...toArray(node.next)];
  const arr = toArray(head);
  return arr.every((v, i) => v === arr[arr.length - 1 - i]);
}

/**
 * Problem 47: Rotate List (LeetCode 61)
 * Difficulty: Med
 * Language: TypeScript
 */
function rotateRight(head: number[], k: number): number[] {
  if (head.length === 0) return [];
  const n = head.length;
  const rot = k % n;
  if (rot === 0) return head;
  return [...head.slice(n - rot), ...head.slice(0, n - rot)];
}

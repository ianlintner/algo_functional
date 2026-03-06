/**
 * Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
 * Difficulty: Easy
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function maxDepth(root: TreeNode | null): number {
  return root === null ? 0 : 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

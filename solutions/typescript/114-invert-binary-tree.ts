/**
 * Problem 114: Invert Binary Tree (LeetCode 226)
 * Difficulty: Easy
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;
  return {
    val: root.val,
    left: invertTree(root.right),
    right: invertTree(root.left)
  };
}

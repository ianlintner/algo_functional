/**
 * Problem 120: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
 * Difficulty: Med
 * Language: TypeScript
 */
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function lowestCommonAncestorBST(root: TreeNode | null, p: number, q: number): number | null {
  if (root === null) return null;
  if (p < root.val && q < root.val) return lowestCommonAncestorBST(root.left, p, q);
  if (p > root.val && q > root.val) return lowestCommonAncestorBST(root.right, p, q);
  return root.val;
}

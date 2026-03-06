/**
 * Problem 121: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
 * Difficulty: Med
 * Language: TypeScript
 */
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function lowestCommonAncestor(root: TreeNode | null, p: number, q: number): TreeNode | null {
  if (root === null || root.val === p || root.val === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}

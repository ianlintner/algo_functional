/**
 * Problem 117: Kth Smallest Element in a BST (LeetCode 230)
 * Difficulty: Med
 * Language: TypeScript
 */
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function kthSmallest(root: TreeNode | null, k: number): number {
  const inorder = (node: TreeNode | null): number[] =>
    node === null ? []
      : [...inorder(node.left), node.val, ...inorder(node.right)];
  return inorder(root)[k - 1];
}

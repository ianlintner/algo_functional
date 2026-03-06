/**
 * Problem 135: Inorder Successor in BST (LeetCode 285)
 * Difficulty: Med
 * Language: TypeScript
 */
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function inorderSuccessor(root: TreeNode | null, p: TreeNode): TreeNode | null {
  const search = (node: TreeNode | null, candidate: TreeNode | null): TreeNode | null => {
    if (!node) return candidate;
    if (node.val > p.val) return search(node.left, node);
    return search(node.right, candidate);
  };
  return search(root, null);
}

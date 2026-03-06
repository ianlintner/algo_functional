/**
 * Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
 * Difficulty: Med
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0) return null;
  const rootVal = preorder[0];
  const mid = inorder.indexOf(rootVal);
  return {
    val: rootVal,
    left: buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid)),
    right: buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1)),
  };
}

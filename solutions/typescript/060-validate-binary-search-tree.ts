/**
 * Problem 60: Validate Binary Search Tree (LeetCode 98)
 * Difficulty: Med
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function isValidBST(root: TreeNode | null): boolean {
  const validate = (
    node: TreeNode | null, lo: number, hi: number
  ): boolean =>
    node === null ||
    (node.val > lo && node.val < hi &&
     validate(node.left, lo, node.val) &&
     validate(node.right, node.val, hi));
  return validate(root, -Infinity, Infinity);
}

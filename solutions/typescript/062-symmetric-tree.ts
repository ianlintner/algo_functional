/**
 * Problem 62: Symmetric Tree (LeetCode 101)
 * Difficulty: Easy
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function isSymmetric(root: TreeNode | null): boolean {
  const mirror = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return a.val === b.val &&
      mirror(a.left, b.right) &&
      mirror(a.right, b.left);
  };
  return root === null || mirror(root.left, root.right);
}

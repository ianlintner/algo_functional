/**
 * Problem 70: Path Sum II (LeetCode 113)
 * Difficulty: Med
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function pathSum(root: TreeNode | null, target: number): number[][] {
  if (root === null) return [];
  if (root.left === null && root.right === null) {
    return root.val === target ? [[root.val]] : [];
  }
  const remain = target - root.val;
  return [
    ...pathSum(root.left, remain),
    ...pathSum(root.right, remain),
  ].map(path => [root.val, ...path]);
}

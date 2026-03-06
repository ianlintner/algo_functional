/**
 * Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
 * Difficulty: Hard
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function maxPathSum(root: TreeNode | null): number {
  const helper = (node: TreeNode | null): [number, number] => {
    if (!node) return [0, -Infinity];
    const [lg, lmax] = helper(node.left);
    const [rg, rmax] = helper(node.right);
    const gain = Math.max(0, node.val + Math.max(lg, rg));
    const pathMax = Math.max(lmax, rmax, node.val + lg + rg);
    return [gain, pathMax];
  };
  return helper(root)[1];
}

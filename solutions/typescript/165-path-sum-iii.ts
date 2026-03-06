/**
 * Problem 165: Path Sum III (LeetCode 437)
 * Difficulty: Med
 * Language: TypeScript
 */
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }

function pathSum(root: TreeNode | null, targetSum: number): number {
  const dfs = (node: TreeNode | null, prefix: Map<number, number>, curr: number): number => {
    if (!node) return 0;
    const sum = curr + node.val;
    const count = prefix.get(sum - targetSum) ?? 0;
    const newPrefix = new Map(prefix);
    newPrefix.set(sum, (newPrefix.get(sum) ?? 0) + 1);
    return count + dfs(node.left, newPrefix, sum) + dfs(node.right, newPrefix, sum);
  };
  return dfs(root, new Map([[0, 1]]), 0);
}

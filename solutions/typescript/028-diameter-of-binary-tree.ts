/**
 * Problem 28: Diameter of Binary Tree (LeetCode 543)
 * Difficulty: Easy
 * Language: TypeScript
 */
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function diameterOfBinaryTree(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null): [number, number] => {
    // returns [height, diameter]
    if (!node) return [0, 0];
    const [lh, ld] = dfs(node.left);
    const [rh, rd] = dfs(node.right);
    return [1 + Math.max(lh, rh), Math.max(lh + rh, ld, rd)];
  };
  return dfs(root)[1];
}

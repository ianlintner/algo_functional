/**
 * Problem 46: Subtree of Another Tree (LeetCode 572)
 * Difficulty: Easy
 * Language: TypeScript
 */
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function isSubtree(root: TreeNode | null, sub: TreeNode | null): boolean {
  const serialize = (node: TreeNode | null): string =>
    node === null
      ? "#"
      : `(${node.val},${serialize(node.left)},${serialize(node.right)})`;
  return serialize(root).includes(serialize(sub));
}

/**
 * Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
 * Difficulty: Hard
 * Language: TypeScript
 */
interface TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; }
function serialize(root: TreeNode | null): string {
  if (!root) return 'null';
  return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}
function deserialize(data: string): TreeNode | null {
  const tokens = data.split(',');
  const build = (idx: number): [TreeNode | null, number] => {
    if (tokens[idx] === 'null') return [null, idx + 1];
    const node: TreeNode = { val: parseInt(tokens[idx]), left: null, right: null };
    const [left, i1] = build(idx + 1);
    const [right, i2] = build(i1);
    node.left = left; node.right = right;
    return [node, i2];
  };
  return build(0)[0];
}

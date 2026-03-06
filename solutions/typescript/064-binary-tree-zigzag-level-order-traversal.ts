/**
 * Problem 64: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
 * Difficulty: Med
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const bfs = (queue: TreeNode[], level: number): number[][] => {
    if (queue.length === 0) return [];
    const vals = queue.map(n => n.val);
    const row = level % 2 === 0 ? vals : [...vals].reverse();
    const next = queue.flatMap(n =>
      [n.left, n.right].filter((c): c is TreeNode => c !== null)
    );
    return [row, ...bfs(next, level + 1)];
  };
  return bfs([root], 0);
}

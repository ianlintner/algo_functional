/**
 * Problem 63: Binary Tree Level Order Traversal (LeetCode 102)
 * Difficulty: Med
 * Language: TypeScript
 */
type TreeNode = { val: number; left: TreeNode | null; right: TreeNode | null };

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const bfs = (queue: TreeNode[]): number[][] => {
    if (queue.length === 0) return [];
    const vals = queue.map(n => n.val);
    const next = queue.flatMap(n =>
      [n.left, n.right].filter((c): c is TreeNode => c !== null)
    );
    return [vals, ...bfs(next)];
  };
  return bfs([root]);
}

/**
 * Problem 99: Binary Tree Right Side View (LeetCode 199)
 * Difficulty: Med
 * Language: TypeScript
 */
type BTNode = { val: number; left: BTNode | null; right: BTNode | null };

function rightSideView(root: BTNode | null): number[] {
  const bfs = (level: BTNode[]): number[] => {
    if (level.length === 0) return [];
    const last = level[level.length - 1].val;
    const next = level.flatMap(n =>
      [n.left, n.right].filter((c): c is BTNode => c !== null)
    );
    return [last, ...bfs(next)];
  };
  return root ? bfs([root]) : [];
}

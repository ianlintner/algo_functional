/**
 * Problem 88: Maximum Width of Binary Tree (LeetCode 662)
 * Difficulty: Med
 * Language: TypeScript
 */
// BFS with position indices – functional style
type TNode = { val: number; left: TNode | null; right: TNode | null };

function widthOfBinaryTree(root: TNode | null): number {
  if (!root) return 0;
  type Level = [TNode, bigint][];
  const bfs = (level: Level, maxW: bigint): bigint => {
    if (level.length === 0) return maxW;
    const w = level[level.length - 1][1] - level[0][1] + 1n;
    const next = level.flatMap(([node, i]) => [
      ...(node.left ? [[node.left, 2n * i] as [TNode, bigint]] : []),
      ...(node.right ? [[node.right, 2n * i + 1n] as [TNode, bigint]] : []),
    ]);
    return bfs(next, w > maxW ? w : maxW);
  };
  return Number(bfs([[root, 0n]], 0n));
}

/**
 * Problem 78: Clone Graph (LeetCode 133)
 * Difficulty: Med
 * Language: TypeScript
 */
type GNode = { val: number; neighbors: GNode[] };

function cloneGraph(node: GNode | null): GNode | null {
  const dfs = (n: GNode, visited: Map<number, GNode>): GNode => {
    if (visited.has(n.val)) return visited.get(n.val)!;
    const clone: GNode = { val: n.val, neighbors: [] };
    const newVisited = new Map(visited).set(n.val, clone);
    clone.neighbors = n.neighbors.map(nb => dfs(nb, newVisited));
    return clone;
  };
  return node ? dfs(node, new Map()) : null;
}

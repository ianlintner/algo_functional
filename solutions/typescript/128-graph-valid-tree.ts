/**
 * Problem 128: Graph Valid Tree (LeetCode 261)
 * Difficulty: Med
 * Language: TypeScript
 */
function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;
  const adj = edges.reduce<Record<number, number[]>>(
    (g, [u, v]) => ({
      ...g, [u]: [...(g[u] || []), v], [v]: [...(g[v] || []), u]
    }), {});
  const dfs = (node: number, visited: Set<number>): Set<number> => {
    if (visited.has(node)) return visited;
    const v = new Set([...visited, node]);
    return (adj[node] || []).reduce((acc, nb) => dfs(nb, acc), v);
  };
  return dfs(0, new Set()).size === n;
}

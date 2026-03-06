/**
 * Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
 * Difficulty: Med
 * Language: TypeScript
 */
function countComponents(n: number, edges: number[][]): number {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number =>
    parent[x] === x ? x : (() => { parent[x] = find(parent[x]); return parent[x]; })();
  const union = (a: number, b: number): boolean => {
    const [ra, rb] = [find(a), find(b)];
    if (ra === rb) return false;
    parent[ra] = rb;
    return true;
  };
  return edges.reduce((count, [u, v]) => union(u, v) ? count - 1 : count, n);
}

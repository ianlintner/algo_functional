/**
 * Problem 141: Minimum Height Trees (LeetCode 310)
 * Difficulty: Med
 * Language: TypeScript
 */
function findMinHeightTrees(n: number, edges: number[][]): number[] {
  if (n === 1) return [0];
  const adj = edges.reduce<Map<number, Set<number>>>((g, [u, v]) => {
    if (!g.has(u)) g.set(u, new Set());
    if (!g.has(v)) g.set(v, new Set());
    g.get(u)!.add(v); g.get(v)!.add(u);
    return g;
  }, new Map());
  const trim = (leaves: number[], remaining: number): number[] => {
    if (remaining <= 2) return leaves;
    const newLeaves = leaves.reduce<number[]>((acc, leaf) => {
      const neighbors = adj.get(leaf)!;
      neighbors.forEach(nb => {
        adj.get(nb)!.delete(leaf);
        if (adj.get(nb)!.size === 1) acc.push(nb);
      });
      return acc;
    }, []);
    return trim(newLeaves, remaining - leaves.length);
  };
  const initLeaves = [...adj.entries()].filter(([, s]) => s.size === 1).map(([k]) => k);
  return trim(initLeaves, n);
}

/**
 * Problem 105: Course Schedule II (LeetCode 210)
 * Difficulty: Med
 * Language: TypeScript
 */
function findOrder(n: number, prereqs: number[][]): number[] {
  const graph = prereqs.reduce<Record<number, number[]>>(
    (g, [a, b]) => ({ ...g, [b]: [...(g[b] || []), a] }), {}
  );
  type S = { path: Set<number>; done: Set<number>; order: number[]; cycle: boolean };
  const dfs = (v: number, s: S): S => {
    if (s.cycle || s.done.has(v)) return s;
    if (s.path.has(v)) return { ...s, cycle: true };
    const s1 = { ...s, path: new Set([...s.path, v]) };
    const s2 = (graph[v] || []).reduce((st: S, nb: number) => dfs(nb, st), s1);
    return { ...s2, done: new Set([...s2.done, v]), order: [...s2.order, v] };
  };
  const init: S = { path: new Set(), done: new Set(), order: [], cycle: false };
  const result = Array.from({ length: n }, (_, i) => i).reduce((s, i) => dfs(i, s), init);
  return result.cycle ? [] : result.order;
}

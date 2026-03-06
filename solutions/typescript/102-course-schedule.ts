/**
 * Problem 102: Course Schedule (LeetCode 207)
 * Difficulty: Med
 * Language: TypeScript
 */
function canFinish(n: number, prereqs: number[][]): boolean {
  const graph = prereqs.reduce<Record<number, number[]>>(
    (g, [a, b]) => ({ ...g, [b]: [...(g[b] || []), a] }), {}
  );
  type S = { path: Set<number>; done: Set<number> };
  const dfs = (v: number, s: S): [boolean, S] => {
    if (s.done.has(v)) return [false, s];
    if (s.path.has(v)) return [true, s];
    const s1: S = { ...s, path: new Set([...s.path, v]) };
    const [cyc, s2] = (graph[v] || []).reduce<[boolean, S]>(
      ([c, st], nb) => c ? [true, st] : dfs(nb, st), [false, s1]
    );
    return [cyc, { path: s2.path, done: new Set([...s2.done, v]) }];
  };
  const init: S = { path: new Set(), done: new Set() };
  return !Array.from({ length: n }, (_, i) => i)
    .reduce<[boolean, S]>(([c, s], i) => c ? [true, s] : dfs(i, s), [false, init])[0];
}

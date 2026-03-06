/**
 * Problem 104: Accounts Merge (LeetCode 721)
 * Difficulty: Med
 * Language: TypeScript
 */
function accountsMerge(accounts: string[][]): string[][] {
  type UF = Record<string, string>;
  const find = (uf: UF, x: string): [UF, string] => {
    if (!(x in uf)) return [{ ...uf, [x]: x }, x];
    if (uf[x] === x) return [uf, x];
    const [uf2, r] = find(uf, uf[x]);
    return [{ ...uf2, [x]: r }, r];
  };
  const union = (uf: UF, a: string, b: string): UF => {
    const [u1, ra] = find(uf, a);
    const [u2, rb] = find(u1, b);
    return ra === rb ? u2 : { ...u2, [ra]: rb };
  };
  const [uf, owner] = accounts.reduce<[UF, Record<string, string>]>(
    ([u, o], [name, ...emails]) =>
      emails.reduce(([u2, o2], e) =>
        [union(u2, emails[0], e), { ...o2, [e]: name }], [u, o]),
    [{}, {}]
  );
  const groups = Object.keys(owner).reduce<Record<string, string[]>>((g, e) => {
    const [, root] = find(uf, e);
    return { ...g, [root]: [...(g[root] || []), e] };
  }, {});
  return Object.values(groups).map(es => [owner[es[0]], ...es.sort()]);
}

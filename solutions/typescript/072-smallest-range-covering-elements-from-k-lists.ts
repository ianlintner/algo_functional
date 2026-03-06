/**
 * Problem 72: Smallest Range Covering Elements from K Lists (LeetCode 632)
 * Difficulty: Hard
 * Language: TypeScript
 */
function smallestRange(nums: number[][]): number[] {
  const tagged: [number, number][] = nums.flatMap((list, i) => list.map(v => [v, i] as [number, number]));
  const sorted = [...tagged].sort((a, b) => a[0] - b[0]);
  const fold = sorted.reduce<{ best: [number, number]; counts: Map<number, number>; covered: number; left: number }>(
    (acc, [val, grp], right) => {
      const c = new Map(acc.counts);
      const prev = c.get(grp) ?? 0;
      c.set(grp, prev + 1);
      let covered = acc.covered + (prev === 0 ? 1 : 0);
      let left = acc.left;
      let best = acc.best;
      const shrink = (l: number, cov: number, cs: Map<number, number>, b: [number, number]): { left: number; covered: number; counts: Map<number, number>; best: [number, number] } => {
        if (cov < nums.length) return { left: l, covered: cov, counts: cs, best: b };
        const newB: [number, number] = (val - sorted[l][0] < b[1] - b[0]) ? [sorted[l][0], val] : b;
        const lg = sorted[l][1];
        const nc = new Map(cs);
        nc.set(lg, nc.get(lg)! - 1);
        const newCov = nc.get(lg)! === 0 ? cov - 1 : cov;
        return shrink(l + 1, newCov, nc, newB);
      };
      const res = shrink(left, covered, c, best);
      return { best: res.best, counts: res.counts, covered: res.covered, left: res.left };
    },
    { best: [-Infinity, Infinity], counts: new Map(), covered: 0, left: 0 }
  );
  return fold.best;
}

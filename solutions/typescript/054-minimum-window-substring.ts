/**
 * Problem 54: Minimum Window Substring (LeetCode 76)
 * Difficulty: Hard
 * Language: TypeScript
 */
function minWindow(s: string, t: string): string {
  const need = [...t].reduce<Record<string, number>>(
    (m, c) => ({ ...m, [c]: (m[c] || 0) + 1 }), {}
  );
  const keys = Object.keys(need).length;

  const go = (
    l: number, r: number, have: number,
    win: Record<string, number>, best: [number, number]
  ): [number, number] => {
    if (r >= s.length) return best;
    const c = s[r];
    const newWin = { ...win, [c]: (win[c] || 0) + 1 };
    const newHave = have + (newWin[c] === need[c] ? 1 : 0);
    const shrink = (
      l2: number, h2: number, w2: Record<string, number>,
      b2: [number, number]
    ): { l: number; h: number; w: Record<string, number>; b: [number, number] } => {
      if (h2 < keys) return { l: l2, h: h2, w: w2, b: b2 };
      const nb = r - l2 + 1 < b2[1] - b2[0] ? [l2, r + 1] as [number, number] : b2;
      const lc = s[l2];
      const nw = { ...w2, [lc]: w2[lc] - 1 };
      const nh = h2 - (nw[lc] < (need[lc] || 0) ? 1 : 0);
      return shrink(l2 + 1, nh, nw, nb);
    };
    const { l: nl, h: nh, w: nw, b: nb } = shrink(l, newHave, newWin, best);
    return go(nl, r + 1, nh, nw, nb);
  };
  const [start, end] = go(0, 0, 0, {}, [0, Infinity]);
  return end === Infinity ? "" : s.slice(start, end);
}

/**
 * Problem 166: Find All Anagrams in a String (LeetCode 438)
 * Difficulty: Med
 * Language: TypeScript
 */
function findAnagrams(s: string, p: string): number[] {
  const pFreq = [...p].reduce((m, c) => m.set(c, (m.get(c) ?? 0) + 1), new Map<string, number>());
  const wFreq = new Map<string, number>();
  const pLen = p.length;
  return [...s].reduce<[number[], number]>(([result, left], ch, right) => {
    wFreq.set(ch, (wFreq.get(ch) ?? 0) + 1);
    if (right - left + 1 > pLen) {
      const lc = s[left];
      wFreq.set(lc, wFreq.get(lc)! - 1);
      if (wFreq.get(lc) === 0) wFreq.delete(lc);
      left++;
    }
    if (right - left + 1 === pLen &&
        [...pFreq].every(([k, v]) => wFreq.get(k) === v))
      return [[...result, left], left] as [number[], number];
    return [result, left] as [number[], number];
  }, [[], 0])[0];
}

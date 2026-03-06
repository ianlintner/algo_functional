/**
 * Problem 59: Decode Ways (LeetCode 91)
 * Difficulty: Med
 * Language: TypeScript
 */
function numDecodings(s: string): number {
  const memo = new Map<number, number>();
  const decode = (i: number): number => {
    if (i === s.length) return 1;
    if (s[i] === '0') return 0;
    if (memo.has(i)) return memo.get(i)!;
    let count = decode(i + 1);
    if (i + 1 < s.length && parseInt(s.slice(i, i + 2)) <= 26) {
      count += decode(i + 2);
    }
    memo.set(i, count);
    return count;
  };
  return decode(0);
}

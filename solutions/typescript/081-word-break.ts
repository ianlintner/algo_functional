/**
 * Problem 81: Word Break (LeetCode 139)
 * Difficulty: Med
 * Language: TypeScript
 */
function wordBreak(s: string, wordDict: string[]): boolean {
  const dict = new Set(wordDict);
  const dp = Array.from({ length: s.length + 1 }, (_, i) =>
    i === 0 ? true : false
  );
  const solve = (i: number): boolean[] => {
    if (i > s.length) return dp;
    dp[i] = Array.from({ length: i }, (_, j) => j).some(
      j => dp[j] && dict.has(s.slice(j, i))
    );
    return solve(i + 1);
  };
  return solve(1)[s.length];
}

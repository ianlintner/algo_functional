/**
 * Problem 37: Group Anagrams (LeetCode 49)
 * Difficulty: Med
 * Language: TypeScript
 */
function groupAnagrams(strs: string[]): string[][] {
  const grouped = strs.reduce<Map<string, string[]>>((acc, s) => {
    const key = [...s].sort().join('');
    return new Map([...acc, [key, [...(acc.get(key) || []), s]]]);
  }, new Map());
  return [...grouped.values()];
}

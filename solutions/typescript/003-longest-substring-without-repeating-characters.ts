/**
 * Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
 * Difficulty: Med
 * Language: TypeScript
 */
function lengthOfLongestSubstring(s: string): number {
  const [, , maxLen] = [...s].reduce<[number, Map<string, number>, number]>(
    ([left, seen, best], char, i) => {
      const newLeft = seen.has(char)
        ? Math.max(left, seen.get(char)! + 1)
        : left;
      const newSeen = new Map([...seen, [char, i]]);
      return [newLeft, newSeen, Math.max(best, i - newLeft + 1)];
    },
    [0, new Map(), 0]
  );
  return maxLen;
}

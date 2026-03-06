/**
 * Problem 124: Valid Anagram (LeetCode 242)
 * Difficulty: Easy
 * Language: TypeScript
 */
function isAnagram(s: string, t: string): boolean {
  const freq = (str: string) =>
    [...str].reduce<Record<string, number>>(
      (acc, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }), {});
  const fs = freq(s);
  const ft = freq(t);
  return JSON.stringify(Object.entries(fs).sort()) ===
         JSON.stringify(Object.entries(ft).sort());
}

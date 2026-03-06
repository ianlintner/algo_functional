/**
 * Problem 155: Ransom Note (LeetCode 383)
 * Difficulty: Easy
 * Language: TypeScript
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
  const freq = [...magazine].reduce<Record<string, number>>(
    (acc, ch) => ({ ...acc, [ch]: (acc[ch] ?? 0) + 1 }), {});
  return [...ransomNote].every(ch => {
    freq[ch] = (freq[ch] ?? 0) - 1;
    return freq[ch] >= 0;
  });
}

/**
 * Problem 12: Longest Common Prefix (LeetCode 14)
 * Difficulty: Easy
 * Language: TypeScript
 */
function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return '';
  return strs.reduce((prefix, str) =>
    [...prefix].reduce(
      (acc, ch, i) => (i < str.length && str[i] === ch ? acc + ch : acc),
      ''
    ).slice(0, [...prefix].findIndex((ch, i) =>
      i >= str.length || str[i] !== ch
    ) === -1 ? prefix.length : [...prefix].findIndex((ch, i) =>
      i >= str.length || str[i] !== ch
    ))
  );
}

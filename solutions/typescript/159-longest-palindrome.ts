/**
 * Problem 159: Longest Palindrome (LeetCode 409)
 * Difficulty: Easy
 * Language: TypeScript
 */
function longestPalindrome(s: string): number {
  const freq = [...s].reduce<Record<string, number>>(
    (acc, ch) => ({ ...acc, [ch]: (acc[ch] ?? 0) + 1 }), {});
  const pairs = Object.values(freq).reduce((sum, cnt) => sum + Math.floor(cnt / 2) * 2, 0);
  return pairs + (pairs < s.length ? 1 : 0);
}

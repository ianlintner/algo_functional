/**
 * Problem 5: Longest Palindromic Substring (LeetCode 5)
 * Difficulty: Med
 * Language: TypeScript
 */
function longestPalindrome(s: string): string {
  const expandAroundCenter = (left: number, right: number): string => {
    if (left < 0 || right >= s.length || s[left] !== s[right]) {
      return s.slice(left + 1, right);
    }
    return expandAroundCenter(left - 1, right + 1);
  };

  return [...s].reduce((best, _, i) => {
    const odd = expandAroundCenter(i, i);
    const even = expandAroundCenter(i, i + 1);
    const candidate = odd.length >= even.length ? odd : even;
    return candidate.length > best.length ? candidate : best;
  }, '');
}

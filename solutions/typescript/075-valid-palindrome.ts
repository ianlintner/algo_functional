/**
 * Problem 75: Valid Palindrome (LeetCode 125)
 * Difficulty: Easy
 * Language: TypeScript
 */
function isPalindrome(s: string): boolean {
  const cleaned = [...s.toLowerCase()].filter(c => /[a-z0-9]/.test(c));
  const check = (i: number, j: number): boolean =>
    i >= j ? true : cleaned[i] === cleaned[j] && check(i + 1, j - 1);
  return check(0, cleaned.length - 1);
}

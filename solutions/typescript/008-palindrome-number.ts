/**
 * Problem 8: Palindrome Number (LeetCode 9)
 * Difficulty: Easy
 * Language: TypeScript
 */
function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const digits = x.toString().split('');
  return digits.reduce((acc, d, i) =>
    acc && d === digits[digits.length - 1 - i], true);
}

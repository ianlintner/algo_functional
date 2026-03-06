/**
 * Problem 6: Reverse Integer (LeetCode 7)
 * Difficulty: Med
 * Language: TypeScript
 */
function reverse(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const reversed = Math.abs(x)
    .toString()
    .split('')
    .reduce((acc, d) => acc + d, '')
    .split('')
    .reverse()
    .join('');
  const result = sign * parseInt(reversed, 10);
  return result > 2**31 - 1 || result < -(2**31) ? 0 : result;
}

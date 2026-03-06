/**
 * Problem 93: Largest Number (LeetCode 179)
 * Difficulty: Med
 * Language: TypeScript
 */
function largestNumber(nums: number[]): string {
  const sorted = [...nums]
    .map(String)
    .sort((a, b) => (b + a).localeCompare(a + b));
  const result = sorted.join('');
  return result[0] === '0' ? '0' : result;
}

/**
 * Problem 92: Majority Element (LeetCode 169)
 * Difficulty: Easy
 * Language: TypeScript
 */
// Boyer-Moore Voting – functional fold
function majorityElement(nums: number[]): number {
  const [candidate] = nums.reduce<[number, number]>(
    ([cand, count], n) => {
      if (count === 0) return [n, 1];
      return n === cand ? [cand, count + 1] : [cand, count - 1];
    },
    [0, 0]
  );
  return candidate;
}

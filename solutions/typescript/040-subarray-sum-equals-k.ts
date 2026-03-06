/**
 * Problem 40: Subarray Sum Equals K (LeetCode 560)
 * Difficulty: Med
 * Language: TypeScript
 */
function subarraySum(nums: number[], k: number): number {
  return nums.reduce<{ count: number; sum: number; map: Map<number, number> }>(
    (acc, n) => {
      const sum = acc.sum + n;
      const count = acc.count + (acc.map.get(sum - k) || 0);
      const map = new Map(acc.map);
      map.set(sum, (map.get(sum) || 0) + 1);
      return { count, sum, map };
    },
    { count: 0, sum: 0, map: new Map([[0, 1]]) }
  ).count;
}

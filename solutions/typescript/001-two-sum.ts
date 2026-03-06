/**
 * Problem 1: Two Sum (LeetCode 1)
 * Difficulty: Easy
 * Language: TypeScript
 */
function twoSum(nums: number[], target: number): number[] {
  const result = nums.reduce<{ map: Map<number, number>; ans: number[] }>(
    (acc, num, i) => {
      if (acc.ans.length > 0) return acc;
      const complement = target - num;
      if (acc.map.has(complement)) {
        return { ...acc, ans: [acc.map.get(complement)!, i] };
      }
      return { map: new Map([...acc.map, [num, i]]), ans: [] };
    },
    { map: new Map(), ans: [] }
  );
  return result.ans;
}

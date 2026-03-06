/**
 * Problem 16: Contiguous Array (LeetCode 525)
 * Difficulty: Med
 * Language: TypeScript
 */
function findMaxLength(nums: number[]): number {
  const [, , maxLen] = nums.reduce<[Map<number, number>, number, number]>(
    ([map, count, best], num, i) => {
      const newCount = count + (num === 1 ? 1 : -1);
      if (newCount === 0) return [map, newCount, i + 1];
      if (map.has(newCount)) return [map, newCount, Math.max(best, i - map.get(newCount)!)];
      return [new Map([...map, [newCount, i]]), newCount, best];
    },
    [new Map(), 0, 0]
  );
  return maxLen;
}

/**
 * Problem 13: 3Sum (LeetCode 15)
 * Difficulty: Med
 * Language: TypeScript
 */
function threeSum(nums: number[]): number[][] {
  const sorted = [...nums].sort((a, b) => a - b);

  const twoSum = (arr: number[], target: number, lo: number): number[][] => {
    const go = (l: number, r: number, acc: number[][]): number[][] => {
      if (l >= r) return acc;
      const sum = arr[l] + arr[r];
      if (sum < target) return go(l + 1, r, acc);
      if (sum > target) return go(l, r - 1, acc);
      return go(
        l + 1 + (arr[l] === arr[l + 1] ? 1 : 0),
        r - 1,
        [...acc, [-target, arr[l], arr[r]]]
      );
    };
    return go(lo, arr.length - 1, []);
  };

  return sorted.reduce<number[][]>((acc, num, i) => {
    if (i > 0 && num === sorted[i - 1]) return acc;
    return [...acc, ...twoSum(sorted, -num, i + 1)];
  }, []);
}

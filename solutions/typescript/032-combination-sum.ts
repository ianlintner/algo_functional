/**
 * Problem 32: Combination Sum (LeetCode 39)
 * Difficulty: Med
 * Language: TypeScript
 */
function combinationSum(candidates: number[], target: number): number[][] {
  const sorted = [...candidates].sort((a, b) => a - b);
  const go = (start: number, remaining: number, current: number[]): number[][] => {
    if (remaining === 0) return [current];
    if (remaining < 0) return [];
    return sorted.slice(start).reduce<number[][]>((acc, c, i) => {
      if (c > remaining) return acc;
      return [...acc, ...go(start + i, remaining - c, [...current, c])];
    }, []);
  };
  return go(0, target, []);
}

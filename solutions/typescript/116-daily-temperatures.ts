/**
 * Problem 116: Daily Temperatures (LeetCode 739)
 * Difficulty: Med
 * Language: TypeScript
 */
function dailyTemperatures(temperatures: number[]): number[] {
  const go = (i: number, stack: number[], res: number[]): number[] => {
    if (i < 0) return res;
    const pop = (s: number[]): number[] =>
      s.length > 0 && temperatures[s[s.length - 1]] <= temperatures[i]
        ? pop(s.slice(0, -1)) : s;
    const newStack = pop(stack);
    const val = newStack.length > 0 ? newStack[newStack.length - 1] - i : 0;
    const newRes = [...res.slice(0, i), val, ...res.slice(i + 1)];
    return go(i - 1, [i, ...newStack], newRes);
  };
  return go(temperatures.length - 1, [], Array(temperatures.length).fill(0));
}

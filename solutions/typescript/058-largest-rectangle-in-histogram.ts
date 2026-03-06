/**
 * Problem 58: Largest Rectangle in Histogram (LeetCode 84)
 * Difficulty: Hard
 * Language: TypeScript
 */
function largestRectangleArea(heights: number[]): number {
  const process = (
    hs: number[], idx: number, stack: number[], maxArea: number
  ): number => {
    if (idx === hs.length) {
      return cleanStack(hs, stack, maxArea);
    }
    if (stack.length > 0 && hs[stack[stack.length - 1]] > hs[idx]) {
      const top = stack[stack.length - 1];
      const rest = stack.slice(0, -1);
      const width = rest.length === 0 ? idx : idx - rest[rest.length - 1] - 1;
      return process(hs, idx, rest, Math.max(maxArea, hs[top] * width));
    }
    return process(hs, idx + 1, [...stack, idx], maxArea);
  };
  const cleanStack = (
    hs: number[], stack: number[], maxArea: number
  ): number => {
    if (stack.length === 0) return maxArea;
    const top = stack[stack.length - 1];
    const rest = stack.slice(0, -1);
    const width = rest.length === 0 ? hs.length : hs.length - rest[rest.length - 1] - 1;
    return cleanStack(hs, rest, Math.max(maxArea, hs[top] * width));
  };
  return process(heights, 0, [], 0);
}

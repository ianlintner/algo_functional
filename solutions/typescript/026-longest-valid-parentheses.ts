/**
 * Problem 26: Longest Valid Parentheses (LeetCode 32)
 * Difficulty: Hard
 * Language: TypeScript
 */
function longestValidParentheses(s: string): number {
  const helper = (chars: string[], dir: 1 | -1): number => {
    const [open, close] = dir === 1 ? ['(', ')'] : [')', '('];
    const arr = dir === 1 ? chars : [...chars].reverse();
    return arr.reduce<{ left: number; right: number; max: number }>(
      (acc, c) => {
        const left = acc.left + (c === open ? 1 : 0);
        const right = acc.right + (c === close ? 1 : 0);
        if (right > left) return { left: 0, right: 0, max: acc.max };
        if (left === right)
          return { left, right, max: Math.max(acc.max, 2 * right) };
        return { left, right, max: acc.max };
      },
      { left: 0, right: 0, max: 0 }
    ).max;
  };
  const chars = s.split('');
  return Math.max(helper(chars, 1), helper(chars, -1));
}

/**
 * Problem 20: Generate Parentheses (LeetCode 22)
 * Difficulty: Med
 * Language: TypeScript
 */
function generateParenthesis(n: number): string[] {
  const generate = (open: number, close: number, current: string): string[] => {
    if (current.length === 2 * n) return [current];
    return [
      ...(open < n ? generate(open + 1, close, current + '(') : []),
      ...(close < open ? generate(open, close + 1, current + ')') : []),
    ];
  };
  return generate(0, 0, '');
}

/**
 * Problem 18: Valid Parentheses (LeetCode 20)
 * Difficulty: Easy
 * Language: TypeScript
 */
function isValid(s: string): boolean {
  const matching: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  const stack = [...s].reduce<string[]>((stk, ch) => {
    if ('({['.includes(ch)) return [...stk, ch];
    if (stk.length > 0 && stk[stk.length - 1] === matching[ch]) return stk.slice(0, -1);
    return [...stk, ch]; // mismatch marker
  }, []);
  return stack.length === 0;
}

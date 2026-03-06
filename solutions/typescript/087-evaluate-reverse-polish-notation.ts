/**
 * Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
 * Difficulty: Med
 * Language: TypeScript
 */
function evalRPN(tokens: string[]): number {
  const ops: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b, '-': (a, b) => a - b,
    '*': (a, b) => a * b, '/': (a, b) => Math.trunc(a / b),
  };
  const result = tokens.reduce<number[]>((stack, t) => {
    if (t in ops) {
      const [b, a] = [stack[stack.length - 1], stack[stack.length - 2]];
      return [...stack.slice(0, -2), ops[t](a, b)];
    }
    return [...stack, Number(t)];
  }, []);
  return result[0];
}

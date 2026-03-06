/**
 * Problem 115: Basic Calculator II (LeetCode 227)
 * Difficulty: Med
 * Language: TypeScript
 */
function calculate2(s: string): number {
  const tokens = [...s.replace(/\s/g, '')];
  const readNum = (i: number, acc: number): [number, number] =>
    i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9'
      ? readNum(i + 1, acc * 10 + Number(tokens[i])) : [acc, i];
  const parse = (i: number, stack: number[], op: string): number => {
    const [num, next] = readNum(i, 0);
    const newStack = op === '*'
      ? [...stack.slice(0, -1), stack[stack.length - 1] * num]
      : op === '/'
      ? [...stack.slice(0, -1), Math.trunc(stack[stack.length - 1] / num)]
      : op === '-' ? [...stack, -num] : [...stack, num];
    if (next >= tokens.length) return newStack.reduce((a, b) => a + b, 0);
    return parse(next + 1, newStack, tokens[next]);
  };
  return parse(0, [], '+');
}

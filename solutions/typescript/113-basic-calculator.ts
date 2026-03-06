/**
 * Problem 113: Basic Calculator (LeetCode 224)
 * Difficulty: Hard
 * Language: TypeScript
 */
function calculate(s: string): number {
  const chars = [...s.replace(/\s/g, '')];
  const parse = (i: number): [number, number] => {
    const go = (pos: number, result: number, sign: number): [number, number] => {
      if (pos >= chars.length || chars[pos] === ')') return [result, pos + 1];
      if (chars[pos] === '+') return go(pos + 1, result, 1);
      if (chars[pos] === '-') return go(pos + 1, result, -1);
      if (chars[pos] === '(') {
        const [val, next] = parse(pos + 1);
        return go(next, result + sign * val, 1);
      }
      const [num, next] = readNum(pos, 0);
      return go(next, result + sign * num, 1);
    };
    return go(i, 0, 1);
  };
  const readNum = (i: number, acc: number): [number, number] =>
    i < chars.length && chars[i] >= '0' && chars[i] <= '9'
      ? readNum(i + 1, acc * 10 + Number(chars[i]))
      : [acc, i];
  return parse(0)[0];
}

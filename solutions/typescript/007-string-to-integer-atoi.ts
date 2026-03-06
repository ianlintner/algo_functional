/**
 * Problem 7: String to Integer (atoi) (LeetCode 8)
 * Difficulty: Med
 * Language: TypeScript
 */
function myAtoi(s: string): number {
  const trimmed = s.trimStart();
  const [sign, rest] = trimmed[0] === '-' ? [-1, trimmed.slice(1)]
    : trimmed[0] === '+' ? [1, trimmed.slice(1)]
    : [1, trimmed];

  const num = [...rest].reduce((acc, ch) => {
    if (ch < '0' || ch > '9') return acc;
    const next = acc.result * 10 + parseInt(ch);
    return acc.done ? acc : { result: next, done: false };
  }, { result: 0, done: false });

  // Actually need to stop at first non-digit
  const digits = [...rest].reduce<number[]>((acc, ch) => {
    if (acc.length === 0 && ch >= '0' && ch <= '9') return [parseInt(ch)];
    if (acc.length > 0 && ch >= '0' && ch <= '9') return [...acc, parseInt(ch)];
    if (acc.length > 0) return acc; // stop collecting
    return acc;
  }, []);

  const result = sign * digits.reduce((acc, d) => acc * 10 + d, 0);
  const MIN = -(2 ** 31);
  const MAX = 2 ** 31 - 1;
  return Math.max(MIN, Math.min(MAX, result));
}

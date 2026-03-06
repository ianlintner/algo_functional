/**
 * Problem 131: Encode and Decode Strings (LeetCode 271)
 * Difficulty: Med
 * Language: TypeScript
 */
// Encode: length-prefixed. Decode: parse length prefix.
function encode(strs: string[]): string {
  return strs.reduce((acc, s) => acc + s.length + '#' + s, '');
}
function decode(s: string): string[] {
  const helper = (i: number, acc: string[]): string[] => {
    if (i >= s.length) return acc;
    const hashIdx = s.indexOf('#', i);
    const len = parseInt(s.slice(i, hashIdx), 10);
    const word = s.slice(hashIdx + 1, hashIdx + 1 + len);
    return helper(hashIdx + 1 + len, [...acc, word]);
  };
  return helper(0, []);
}

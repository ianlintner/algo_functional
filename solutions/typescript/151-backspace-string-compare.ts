/**
 * Problem 151: Backspace String Compare (LeetCode 844)
 * Difficulty: Easy
 * Language: TypeScript
 */
function backspaceCompare(s: string, t: string): boolean {
  const build = (str: string): string =>
    [...str].reduce((acc, ch) => ch === '#' ? acc.slice(0, -1) : acc + ch, '');
  return build(s) === build(t);
}

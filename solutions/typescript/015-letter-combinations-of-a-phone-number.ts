/**
 * Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
 * Difficulty: Med
 * Language: TypeScript
 */
function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];
  const map: Record<string, string[]> = {
    '2': ['a','b','c'], '3': ['d','e','f'], '4': ['g','h','i'],
    '5': ['j','k','l'], '6': ['m','n','o'], '7': ['p','q','r','s'],
    '8': ['t','u','v'], '9': ['w','x','y','z'],
  };
  return [...digits].reduce<string[]>(
    (combos, digit) =>
      combos.flatMap(combo => (map[digit] || []).map(ch => combo + ch)),
    ['']
  );
}

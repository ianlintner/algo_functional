/**
 * Problem 148: Palindrome Pairs (LeetCode 336)
 * Difficulty: Hard
 * Language: TypeScript
 */
function palindromePairs(words: string[]): number[][] {
  const isPalin = (s: string): boolean => s === [...s].reverse().join('');
  const map = new Map(words.map((w, i) => [w, i]));
  return words.reduce<number[][]>((acc, word, i) => {
    for (let j = 0; j <= word.length; j++) {
      const left = word.slice(0, j), right = word.slice(j);
      if (isPalin(right)) {
        const rev = [...left].reverse().join('');
        if (map.has(rev) && map.get(rev) !== i) acc.push([i, map.get(rev)!]);
      }
      if (j > 0 && isPalin(left)) {
        const rev = [...right].reverse().join('');
        if (map.has(rev) && map.get(rev) !== i) acc.push([map.get(rev)!, i]);
      }
    }
    return acc;
  }, []);
}

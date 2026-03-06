/**
 * Problem 163: Longest Repeating Character Replacement (LeetCode 424)
 * Difficulty: Med
 * Language: TypeScript
 */
function characterReplacement(s: string, k: number): number {
  const count = new Map<string, number>();
  return [...s].reduce(([left, maxCount, best], ch, right) => {
    count.set(ch, (count.get(ch) ?? 0) + 1);
    const mc = Math.max(maxCount, count.get(ch)!);
    if (right - left + 1 - mc > k) {
      count.set(s[left], count.get(s[left])! - 1);
      return [left + 1, mc, Math.max(best, right - left)] as [number, number, number];
    }
    return [left, mc, Math.max(best, right - left + 1)] as [number, number, number];
  }, [0, 0, 0] as [number, number, number])[2];
}

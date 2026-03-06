/**
 * Problem 158: Random Pick with Weight (LeetCode 528)
 * Difficulty: Med
 * Language: TypeScript
 */
class RandomPickWeight {
  private prefix: number[];
  constructor(w: number[]) {
    this.prefix = w.reduce<number[]>((acc, v) => [...acc, (acc[acc.length - 1] ?? 0) + v], []);
  }
  pickIndex(): number {
    const target = Math.random() * this.prefix[this.prefix.length - 1];
    const search = (lo: number, hi: number): number => {
      if (lo >= hi) return lo;
      const mid = (lo + hi) >> 1;
      return this.prefix[mid] <= target ? search(mid + 1, hi) : search(lo, mid);
    };
    return search(0, this.prefix.length - 1);
  }
}

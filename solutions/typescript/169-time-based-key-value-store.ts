/**
 * Problem 169: Time Based Key-Value Store (LeetCode 981)
 * Difficulty: Med
 * Language: TypeScript
 */
class TimeMap {
  private store = new Map<string, [number, string][]>();

  set(key: string, value: string, timestamp: number): void {
    this.store.set(key, [...(this.store.get(key) ?? []), [timestamp, value]]);
  }

  get(key: string, timestamp: number): string {
    const entries = this.store.get(key) ?? [];
    const bsearch = (lo: number, hi: number): string => {
      if (lo > hi) return hi >= 0 ? entries[hi][1] : "";
      const mid = (lo + hi) >> 1;
      return entries[mid][0] <= timestamp
        ? bsearch(mid + 1, hi)
        : bsearch(lo, mid - 1);
    };
    return bsearch(0, entries.length - 1);
  }
}

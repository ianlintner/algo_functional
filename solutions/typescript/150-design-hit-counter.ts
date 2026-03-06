/**
 * Problem 150: Design Hit Counter (LeetCode 362)
 * Difficulty: Med
 * Language: TypeScript
 */
class HitCounter {
  private hits: number[] = [];
  hit(timestamp: number): void { this.hits = [...this.hits, timestamp]; }
  getHits(timestamp: number): number {
    this.hits = this.hits.filter(t => t > timestamp - 300);
    return this.hits.length;
  }
}

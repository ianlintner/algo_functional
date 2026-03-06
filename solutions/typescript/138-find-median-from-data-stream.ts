/**
 * Problem 138: Find Median from Data Stream (LeetCode 295)
 * Difficulty: Hard
 * Language: TypeScript
 */
// Functional two-heap approach using sorted halves
class MedianFinder {
  private lo: number[] = []; // max-heap as sorted desc
  private hi: number[] = []; // min-heap as sorted asc
  addNum(num: number): void {
    const insert = (arr: number[], val: number) =>
      [...arr.filter(x => x <= val), val, ...arr.filter(x => x > val)];
    if (this.lo.length === 0 || num <= this.lo[this.lo.length - 1]) {
      this.lo = insert(this.lo, num);
    } else {
      this.hi = insert(this.hi, num);
    }
    // Balance
    if (this.lo.length > this.hi.length + 1) {
      this.hi = [this.lo[this.lo.length - 1], ...this.hi];
      this.lo = this.lo.slice(0, -1);
    } else if (this.hi.length > this.lo.length) {
      this.lo = [...this.lo, this.hi[0]];
      this.hi = this.hi.slice(1);
    }
  }
  findMedian(): number {
    return this.lo.length > this.hi.length
      ? this.lo[this.lo.length - 1]
      : (this.lo[this.lo.length - 1] + this.hi[0]) / 2;
  }
}

/**
 * Problem 162: Maximum Frequency Stack (LeetCode 895)
 * Difficulty: Hard
 * Language: TypeScript
 */
class FreqStack {
  private freq = new Map<number, number>();
  private group = new Map<number, number[]>();
  private maxFreq = 0;

  push(val: number): void {
    const f = (this.freq.get(val) ?? 0) + 1;
    this.freq.set(val, f);
    this.maxFreq = Math.max(this.maxFreq, f);
    this.group.set(f, [...(this.group.get(f) ?? []), val]);
  }

  pop(): number {
    const stack = this.group.get(this.maxFreq)!;
    const val = stack[stack.length - 1];
    this.group.set(this.maxFreq, stack.slice(0, -1));
    if (this.group.get(this.maxFreq)!.length === 0) this.maxFreq--;
    this.freq.set(val, this.freq.get(val)! - 1);
    return val;
  }
}

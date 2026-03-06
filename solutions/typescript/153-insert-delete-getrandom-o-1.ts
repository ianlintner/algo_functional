/**
 * Problem 153: Insert Delete GetRandom O(1) (LeetCode 380)
 * Difficulty: Med
 * Language: TypeScript
 */
class RandomizedSet {
  private map: Map<number, number>;
  private list: number[];
  constructor() { this.map = new Map(); this.list = []; }
  insert(val: number): boolean {
    if (this.map.has(val)) return false;
    this.map = new Map([...this.map, [val, this.list.length]]);
    this.list = [...this.list, val];
    return true;
  }
  remove(val: number): boolean {
    if (!this.map.has(val)) return false;
    const idx = this.map.get(val)!;
    const last = this.list[this.list.length - 1];
    const newList = [...this.list.slice(0, -1)];
    if (idx < newList.length) newList[idx] = last;
    const newMap = new Map([...this.map]);
    if (idx < newList.length) newMap.set(last, idx);
    newMap.delete(val);
    this.map = newMap; this.list = newList;
    return true;
  }
  getRandom(): number { return this.list[Math.floor(Math.random() * this.list.length)]; }
}

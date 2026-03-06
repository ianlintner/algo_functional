/**
 * Problem 84: LRU Cache (LeetCode 146)
 * Difficulty: Med
 * Language: TypeScript
 */
type LRU<V> = { capacity: number; order: number[]; cache: Map<number, V> };

const lruCreate = <V>(cap: number): LRU<V> =>
  ({ capacity: cap, order: [], cache: new Map() });

const lruGet = <V>(lru: LRU<V>, key: number): [V | undefined, LRU<V>] => {
  if (!lru.cache.has(key)) return [undefined, lru];
  const val = lru.cache.get(key)!;
  const newOrder = [...lru.order.filter(k => k !== key), key];
  return [val, { ...lru, order: newOrder }];
};

const lruPut = <V>(lru: LRU<V>, key: number, value: V): LRU<V> => {
  const filtered = lru.order.filter(k => k !== key);
  const newOrder = [...filtered, key];
  const newCache = new Map(lru.cache).set(key, value);
  if (newOrder.length > lru.capacity) {
    const evict = newOrder[0];
    newCache.delete(evict);
    return { capacity: lru.capacity, order: newOrder.slice(1), cache: newCache };
  }
  return { capacity: lru.capacity, order: newOrder, cache: newCache };
};

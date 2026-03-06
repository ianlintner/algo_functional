/**
 * Problem 84: LRU Cache (LeetCode 146)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;
struct LRU<V> { cap: usize, order: Vec<i32>, cache: HashMap<i32, V> }
impl<V: Clone> LRU<V> {
    fn new(cap: usize) -> Self { LRU { cap, order: vec![], cache: HashMap::new() } }
    fn get(&self, key: i32) -> (Option<V>, Self) {
        match self.cache.get(&key) {
            None => (None, LRU { cap: self.cap,
                order: self.order.clone(), cache: self.cache.clone() }),
            Some(v) => {
                let mut order: Vec<_> = self.order.iter().filter(|&&k| k != key).cloned().collect();
                order.push(key);
                (Some(v.clone()), LRU { cap: self.cap, order, cache: self.cache.clone() })
            }
        }
    }
    fn put(&self, key: i32, val: V) -> Self {
        let mut order: Vec<_> = self.order.iter().filter(|&&k| k != key).cloned().collect();
        order.push(key);
        let mut cache = self.cache.clone();
        cache.insert(key, val);
        if order.len() > self.cap {
            cache.remove(&order[0]);
            LRU { cap: self.cap, order: order[1..].to_vec(), cache }
        } else { LRU { cap: self.cap, order, cache } }
    }
}

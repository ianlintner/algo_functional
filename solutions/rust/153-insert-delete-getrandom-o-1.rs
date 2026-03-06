/**
 * Problem 153: Insert Delete GetRandom O(1) (LeetCode 380)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;
use rand::Rng;
struct RandomizedSet { map: HashMap<i32, usize>, list: Vec<i32> }
impl RandomizedSet {
    fn new() -> Self { Self { map: HashMap::new(), list: vec![] } }
    fn insert(&mut self, val: i32) -> bool {
        if self.map.contains_key(&val) { return false; }
        self.map.insert(val, self.list.len());
        self.list.push(val); true
    }
    fn remove(&mut self, val: i32) -> bool {
        if let Some(idx) = self.map.remove(&val) {
            let last = *self.list.last().unwrap();
            self.list.swap_remove(idx);
            if idx < self.list.len() { self.map.insert(last, idx); }
            true
        } else { false }
    }
    fn get_random(&self) -> i32 {
        self.list[rand::thread_rng().gen_range(0..self.list.len())]
    }
}

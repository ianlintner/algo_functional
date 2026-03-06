/**
 * Problem 169: Time Based Key-Value Store (LeetCode 981)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

struct TimeMap {
    store: HashMap<String, Vec<(i32, String)>>,
}

impl TimeMap {
    fn new() -> Self { TimeMap { store: HashMap::new() } }

    fn set(&mut self, key: String, value: String, timestamp: i32) {
        self.store.entry(key).or_default().push((timestamp, value));
    }

    fn get(&self, key: &str, timestamp: i32) -> String {
        match self.store.get(key) {
            None => String::new(),
            Some(entries) => {
                match entries.partition_point(|(t, _)| *t <= timestamp) {
                    0 => String::new(),
                    i => entries[i - 1].1.clone(),
                }
            }
        }
    }
}

/**
 * Problem 162: Maximum Frequency Stack (LeetCode 895)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::HashMap;

struct FreqStack {
    freq: HashMap<i32, usize>,
    group: HashMap<usize, Vec<i32>>,
    max_freq: usize,
}

impl FreqStack {
    fn new() -> Self {
        FreqStack { freq: HashMap::new(), group: HashMap::new(), max_freq: 0 }
    }
    fn push(&mut self, val: i32) {
        let f = self.freq.entry(val).or_insert(0);
        *f += 1;
        let f = *f;
        self.max_freq = self.max_freq.max(f);
        self.group.entry(f).or_default().push(val);
    }
    fn pop(&mut self) -> i32 {
        let stack = self.group.get_mut(&self.max_freq).unwrap();
        let val = stack.pop().unwrap();
        if stack.is_empty() { self.max_freq -= 1; }
        *self.freq.get_mut(&val).unwrap() -= 1;
        val
    }
}

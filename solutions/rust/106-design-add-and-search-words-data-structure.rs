/**
 * Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

#[derive(Clone, Default)]
struct WordDict { children: HashMap<char, WordDict>, is_end: bool }

impl WordDict {
    fn new() -> Self { Self::default() }
    fn add(&self, word: &str) -> Self {
        match word.chars().next() {
            None => WordDict { is_end: true, ..self.clone() },
            Some(c) => {
                let child = self.children.get(&c).cloned().unwrap_or_default();
                let mut ch = self.children.clone();
                ch.insert(c, child.add(&word[c.len_utf8()..]));
                WordDict { children: ch, is_end: self.is_end }
            }
        }
    }
    fn search(&self, word: &str) -> bool {
        match word.chars().next() {
            None => self.is_end,
            Some('.') => self.children.values().any(|c| c.search(&word[1..])),
            Some(c) => self.children.get(&c)
                .map_or(false, |t| t.search(&word[c.len_utf8()..]))
        }
    }
}

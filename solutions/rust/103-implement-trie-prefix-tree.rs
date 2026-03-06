/**
 * Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

#[derive(Clone, Default)]
struct Trie { children: HashMap<char, Trie>, is_end: bool }

impl Trie {
    fn new() -> Self { Self::default() }
    fn insert(&self, word: &str) -> Self {
        match word.chars().next() {
            None => Trie { is_end: true, ..self.clone() },
            Some(c) => {
                let child = self.children.get(&c).cloned().unwrap_or_default();
                let mut ch = self.children.clone();
                ch.insert(c, child.insert(&word[c.len_utf8()..]));
                Trie { children: ch, is_end: self.is_end }
            }
        }
    }
    fn search(&self, word: &str) -> bool {
        match word.chars().next() {
            None => self.is_end,
            Some(c) => self.children.get(&c)
                .map_or(false, |t| t.search(&word[c.len_utf8()..]))
        }
    }
}

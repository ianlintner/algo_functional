/**
 * Problem 107: Word Search II (LeetCode 212)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::{HashMap, HashSet};

struct TrieN { children: HashMap<char, TrieN>, word: Option<String> }
impl TrieN {
    fn new() -> Self { TrieN { children: HashMap::new(), word: None } }
    fn insert(&mut self, w: &str) {
        let mut node = self;
        for c in w.chars() {
            node = node.children.entry(c).or_insert_with(TrieN::new);
        }
        node.word = Some(w.to_string());
    }
}
fn find_words(board: &[Vec<char>], words: &[&str]) -> Vec<String> {
    let mut trie = TrieN::new();
    for w in words { trie.insert(w); }
    let (rows, cols) = (board.len(), board[0].len());
    let mut found = HashSet::new();
    fn dfs(r: i32, c: i32, node: &TrieN, board: &[Vec<char>],
           seen: &mut HashSet<(i32,i32)>, found: &mut HashSet<String>,
           rows: usize, cols: usize) {
        if r < 0 || r >= rows as i32 || c < 0 || c >= cols as i32 { return; }
        if !seen.insert((r, c)) { return; }
        if let Some(next) = node.children.get(&board[r as usize][c as usize]) {
            if let Some(ref w) = next.word { found.insert(w.clone()); }
            for (dr,dc) in [(-1i32,0),(1,0),(0,-1),(0,1)] {
                dfs(r+dr, c+dc, next, board, seen, found, rows, cols);
            }
        }
        seen.remove(&(r, c));
    }
    for r in 0..rows as i32 { for c in 0..cols as i32 {
        dfs(r, c, &trie, board, &mut HashSet::new(), &mut found, rows, cols);
    }}
    found.into_iter().collect()
}

/**
 * Problem 57: Word Search (LeetCode 79)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashSet;

fn exist(board: &[Vec<char>], word: &str) -> bool {
    let chars: Vec<char> = word.chars().collect();
    let (rows, cols) = (board.len(), board[0].len());
    fn dfs(board: &[Vec<char>], chars: &[char], r: isize, c: isize,
           i: usize, vis: &mut HashSet<(isize,isize)>, rows: isize, cols: isize) -> bool {
        if i == chars.len() { return true; }
        if r < 0 || r >= rows || c < 0 || c >= cols { return false; }
        let (ru, cu) = (r as usize, c as usize);
        if vis.contains(&(r,c)) || board[ru][cu] != chars[i] { return false; }
        vis.insert((r,c));
        let found = [(1,0),(-1,0),(0,1),(0,-1)].iter().any(|&(dr,dc)|
            dfs(board, chars, r+dr, c+dc, i+1, vis, rows, cols));
        vis.remove(&(r,c));
        found
    }
    (0..rows).any(|r| (0..cols).any(|c|
        dfs(board, &chars, r as isize, c as isize, 0,
            &mut HashSet::new(), rows as isize, cols as isize)))
}

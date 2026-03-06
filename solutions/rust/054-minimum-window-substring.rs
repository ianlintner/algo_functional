/**
 * Problem 54: Minimum Window Substring (LeetCode 76)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::HashMap;

pub fn min_window(s: String, t: String) -> String {
    let s: Vec<char> = s.chars().collect();
    let need: HashMap<char,i32> = t.chars().fold(HashMap::new(), |mut m, c| {
        *m.entry(c).or_insert(0) += 1; m
    });
    let keys = need.len();
    let (mut l, mut have) = (0, 0);
    let mut win: HashMap<char,i32> = HashMap::new();
    let (mut start, mut min_len) = (0, usize::MAX);
    for r in 0..s.len() {
        *win.entry(s[r]).or_insert(0) += 1;
        if win.get(&s[r]) == need.get(&s[r]) { have += 1; }
        while have == keys {
            if r - l + 1 < min_len { start = l; min_len = r - l + 1; }
            *win.get_mut(&s[l]).unwrap() -= 1;
            if win[&s[l]] < *need.get(&s[l]).unwrap_or(&0) { have -= 1; }
            l += 1;
        }
    }
    if min_len == usize::MAX { String::new() }
    else { s[start..start+min_len].iter().collect() }
}

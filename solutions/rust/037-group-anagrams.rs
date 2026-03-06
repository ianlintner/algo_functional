/**
 * Problem 37: Group Anagrams (LeetCode 49)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
    strs.into_iter().fold(HashMap::new(), |mut map, s| {
        let mut key: Vec<char> = s.chars().collect();
        key.sort();
        map.entry(key).or_insert_with(Vec::new).push(s);
        map
    }).into_values().collect()
}

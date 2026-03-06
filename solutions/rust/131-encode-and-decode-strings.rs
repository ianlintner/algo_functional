/**
 * Problem 131: Encode and Decode Strings (LeetCode 271)
 * Difficulty: Med
 * Language: Rust
 */
fn encode(strs: &[String]) -> String {
    strs.iter().fold(String::new(), |acc, s|
        format!("{}{}#{}", acc, s.len(), s))
}
fn decode(s: &str) -> Vec<String> {
    fn helper(s: &str, i: usize, acc: Vec<String>) -> Vec<String> {
        if i >= s.len() { return acc; }
        let hash = s[i..].find('#').unwrap() + i;
        let len: usize = s[i..hash].parse().unwrap();
        let word = s[hash+1..hash+1+len].to_string();
        let mut a = acc; a.push(word);
        helper(s, hash + 1 + len, a)
    }
    helper(s, 0, vec![])
}

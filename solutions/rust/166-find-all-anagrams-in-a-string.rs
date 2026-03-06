/**
 * Problem 166: Find All Anagrams in a String (LeetCode 438)
 * Difficulty: Med
 * Language: Rust
 */
fn find_anagrams(s: &str, p: &str) -> Vec<usize> {
    let (sb, pb) = (s.as_bytes(), p.as_bytes());
    if sb.len() < pb.len() { return vec![]; }
    let mut p_freq = [0i32; 26];
    let mut w_freq = [0i32; 26];
    for &b in pb { p_freq[(b - b'a') as usize] += 1; }
    let mut result = vec![];
    for i in 0..sb.len() {
        w_freq[(sb[i] - b'a') as usize] += 1;
        if i >= pb.len() {
            w_freq[(sb[i - pb.len()] - b'a') as usize] -= 1;
        }
        if w_freq == p_freq { result.push(i + 1 - pb.len()); }
    }
    result
}

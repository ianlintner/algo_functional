/**
 * Problem 163: Longest Repeating Character Replacement (LeetCode 424)
 * Difficulty: Med
 * Language: Rust
 */
fn character_replacement(s: &str, k: usize) -> usize {
    let bytes = s.as_bytes();
    let mut count = [0usize; 26];
    let (mut left, mut max_count, mut best) = (0, 0, 0);
    for right in 0..bytes.len() {
        let idx = (bytes[right] - b'A') as usize;
        count[idx] += 1;
        max_count = max_count.max(count[idx]);
        if right - left + 1 - max_count > k {
            count[(bytes[left] - b'A') as usize] -= 1;
            left += 1;
        }
        best = best.max(right - left + 1);
    }
    best
}

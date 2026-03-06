/**
 * Problem 49: Add Binary (LeetCode 67)
 * Difficulty: Easy
 * Language: Rust
 */
pub fn add_binary(a: String, b: String) -> String {
    let (a, b) = (a.as_bytes(), b.as_bytes());
    let mut result = Vec::new();
    let (mut i, mut j, mut carry) = (a.len(), b.len(), 0u8);
    while i > 0 || j > 0 || carry > 0 {
        let da = if i > 0 { i -= 1; a[i] - b'0' } else { 0 };
        let db = if j > 0 { j -= 1; b[j] - b'0' } else { 0 };
        let s = da + db + carry;
        result.push((s % 2 + b'0') as char);
        carry = s / 2;
    }
    result.iter().rev().collect()
}

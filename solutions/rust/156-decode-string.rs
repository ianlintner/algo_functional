/**
 * Problem 156: Decode String (LeetCode 394)
 * Difficulty: Med
 * Language: Rust
 */
fn decode_string(s: &str) -> String {
    fn helper(chars: &[u8], i: usize) -> (String, usize) {
        let mut result = String::new();
        let mut i = i;
        while i < chars.len() && chars[i] != b']' {
            if chars[i].is_ascii_digit() {
                let mut num = 0usize;
                while i < chars.len() && chars[i].is_ascii_digit() {
                    num = num * 10 + (chars[i] - b'0') as usize; i += 1;
                }
                i += 1; // skip '['
                let (decoded, ni) = helper(chars, i);
                result.push_str(&decoded.repeat(num));
                i = ni + 1; // skip ']'
            } else { result.push(chars[i] as char); i += 1; }
        }
        (result, i)
    }
    helper(s.as_bytes(), 0).0
}

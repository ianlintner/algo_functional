/**
 * Problem 5: Longest Palindromic Substring (LeetCode 5)
 * Difficulty: Med
 * Language: Rust
 */
pub fn longest_palindrome(s: String) -> String {
    let chars: Vec<char> = s.chars().collect();
    let n = chars.len();

    let expand = |mut l: i32, mut r: i32| -> &str {
        while l >= 0 && r < n as i32 && chars[l as usize] == chars[r as usize] {
            l -= 1;
            r += 1;
        }
        &s[(l + 1) as usize..r as usize]
    };

    (0..n).fold("", |best, i| {
        let odd = expand(i as i32, i as i32);
        let even = expand(i as i32, i as i32 + 1);
        let candidate = if odd.len() >= even.len() { odd } else { even };
        if candidate.len() > best.len() { candidate } else { best }
    }).to_string()
}

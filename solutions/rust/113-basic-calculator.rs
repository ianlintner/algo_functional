/**
 * Problem 113: Basic Calculator (LeetCode 224)
 * Difficulty: Hard
 * Language: Rust
 */
fn calculate(s: &str) -> i32 {
    let chars: Vec<char> = s.chars().filter(|c| !c.is_whitespace()).collect();
    fn parse(chars: &[char], mut i: usize) -> (i32, usize) {
        let (mut result, mut sign) = (0i32, 1i32);
        while i < chars.len() && chars[i] != ')' {
            match chars[i] {
                '+' => { sign = 1; i += 1; }
                '-' => { sign = -1; i += 1; }
                '(' => {
                    let (v, ni) = parse(chars, i + 1);
                    result += sign * v; sign = 1; i = ni;
                }
                _ => {
                    let mut num = 0i32;
                    while i < chars.len() && chars[i].is_ascii_digit() {
                        num = num * 10 + (chars[i] as i32 - '0' as i32);
                        i += 1;
                    }
                    result += sign * num; sign = 1;
                }
            }
        }
        (result, i + 1)
    }
    parse(&chars, 0).0
}

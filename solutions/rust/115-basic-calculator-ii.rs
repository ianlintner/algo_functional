/**
 * Problem 115: Basic Calculator II (LeetCode 227)
 * Difficulty: Med
 * Language: Rust
 */
fn calculate2(s: &str) -> i32 {
    let chars: Vec<char> = s.chars()
        .filter(|c| !c.is_whitespace()).collect();
    fn read_num(chars: &[char], i: usize, acc: i32) -> (i32, usize) {
        if i < chars.len() && chars[i].is_ascii_digit() {
            read_num(chars, i + 1,
                acc * 10 + (chars[i] as i32 - '0' as i32))
        } else { (acc, i) }
    }
    fn parse(chars: &[char], i: usize,
             mut stack: Vec<i32>, op: char) -> i32 {
        let (num, next) = read_num(chars, i, 0);
        match op {
            '*' => { let l = stack.pop().unwrap(); stack.push(l * num); }
            '/' => { let l = stack.pop().unwrap(); stack.push(l / num); }
            '-' => stack.push(-num),
            _ => stack.push(num),
        }
        if next >= chars.len() { stack.iter().sum() }
        else { parse(chars, next + 1, stack, chars[next]) }
    }
    parse(&chars, 0, Vec::new(), '+')
}

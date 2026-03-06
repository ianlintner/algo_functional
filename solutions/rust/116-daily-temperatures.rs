/**
 * Problem 116: Daily Temperatures (LeetCode 739)
 * Difficulty: Med
 * Language: Rust
 */
fn daily_temperatures(temps: Vec<i32>) -> Vec<i32> {
    let n = temps.len();
    fn go(temps: &[i32], i: i32, stack: Vec<usize>,
          mut res: Vec<i32>) -> Vec<i32> {
        if i < 0 { return res; }
        let idx = i as usize;
        let mut s = stack;
        while let Some(&top) = s.last() {
            if temps[top] <= temps[idx] { s.pop(); } else { break; }
        }
        res[idx] = s.last().map_or(0, |&j| (j - idx) as i32);
        s.push(idx);
        go(temps, i - 1, s, res)
    }
    go(&temps, (n as i32) - 1, vec![], vec![0; n])
}

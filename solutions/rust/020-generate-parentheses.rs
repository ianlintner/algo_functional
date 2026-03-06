/**
 * Problem 20: Generate Parentheses (LeetCode 22)
 * Difficulty: Med
 * Language: Rust
 */
pub fn generate_parenthesis(n: i32) -> Vec<String> {
    fn gen(open: i32, close: i32, n: i32, current: String) -> Vec<String> {
        if current.len() as i32 == 2 * n {
            return vec![current];
        }
        let mut result = Vec::new();
        if open < n {
            result.extend(gen(open + 1, close, n, format!("{}(", current)));
        }
        if close < open {
            result.extend(gen(open, close + 1, n, format!("{})", current)));
        }
        result
    }
    gen(0, 0, n, String::new())
}

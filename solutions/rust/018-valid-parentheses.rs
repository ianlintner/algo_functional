/**
 * Problem 18: Valid Parentheses (LeetCode 20)
 * Difficulty: Easy
 * Language: Rust
 */
pub fn is_valid(s: String) -> bool {
    s.chars()
        .try_fold(Vec::new(), |mut stk, ch| {
            match ch {
                '(' | '{' | '[' => { stk.push(ch); Some(stk) }
                ')' => if stk.last() == Some(&'(') { stk.pop(); Some(stk) } else { None }
                ']' => if stk.last() == Some(&'[') { stk.pop(); Some(stk) } else { None }
                '}' => if stk.last() == Some(&'{') { stk.pop(); Some(stk) } else { None }
                _ => Some(stk)
            }
        })
        .map_or(false, |stk| stk.is_empty())
}

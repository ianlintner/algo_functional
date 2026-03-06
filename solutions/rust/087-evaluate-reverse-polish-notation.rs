/**
 * Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
 * Difficulty: Med
 * Language: Rust
 */
fn eval_rpn(tokens: &[&str]) -> i32 {
    tokens.iter().fold(vec![], |mut stack, &t| {
        match t {
            "+" | "-" | "*" | "/" => {
                let b = stack.pop().unwrap();
                let a = stack.pop().unwrap();
                stack.push(match t {
                    "+" => a + b, "-" => a - b,
                    "*" => a * b, "/" => a / b, _ => 0,
                });
            }
            _ => stack.push(t.parse::<i32>().unwrap()),
        }
        stack
    }).pop().unwrap()
}

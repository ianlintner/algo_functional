/**
 * Problem 91: Min Stack (LeetCode 155)
 * Difficulty: Med
 * Language: Rust
 */
// Immutable min stack as Vec of (val, min) pairs
fn min_stack_push(stack: &[(i32, i32)], x: i32) -> Vec<(i32, i32)> {
    let cur_min = stack.last().map_or(x, |&(_, m)| x.min(m));
    let mut s = stack.to_vec();
    s.push((x, cur_min));
    s
}
fn min_stack_pop(stack: &[(i32, i32)]) -> Vec<(i32, i32)> {
    stack[..stack.len()-1].to_vec()
}
fn min_stack_top(stack: &[(i32, i32)]) -> i32 { stack.last().unwrap().0 }
fn min_stack_get_min(stack: &[(i32, i32)]) -> i32 { stack.last().unwrap().1 }

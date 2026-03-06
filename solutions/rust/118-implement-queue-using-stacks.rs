/**
 * Problem 118: Implement Queue using Stacks (LeetCode 232)
 * Difficulty: Easy
 * Language: Rust
 */
struct FQueue<T> { in_stack: Vec<T>, out_stack: Vec<T> }
impl<T: Clone> FQueue<T> {
    fn new() -> Self { FQueue { in_stack: vec![], out_stack: vec![] } }
    fn enqueue(&self, x: T) -> Self {
        let mut ins = self.in_stack.clone();
        ins.push(x);
        FQueue { in_stack: ins, out_stack: self.out_stack.clone() }
    }
    fn transfer(&self) -> Self {
        if !self.out_stack.is_empty() { return self.clone(); }
        let mut outs = self.in_stack.clone();
        outs.reverse();
        FQueue { in_stack: vec![], out_stack: outs }
    }
    fn dequeue(&self) -> (T, Self) {
        let t = self.transfer();
        let val = t.out_stack[0].clone();
        (val, FQueue { in_stack: t.in_stack, out_stack: t.out_stack[1..].to_vec() })
    }
}

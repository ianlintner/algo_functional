/**
 * Problem 138: Find Median from Data Stream (LeetCode 295)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::BinaryHeap;
use std::cmp::Reverse;
struct MedianFinder { lo: BinaryHeap<i32>, hi: BinaryHeap<Reverse<i32>> }
impl MedianFinder {
    fn new() -> Self { MedianFinder { lo: BinaryHeap::new(), hi: BinaryHeap::new() } }
    fn add_num(&mut self, num: i32) {
        self.lo.push(num);
        self.hi.push(Reverse(self.lo.pop().unwrap()));
        if self.hi.len() > self.lo.len() {
            self.lo.push(self.hi.pop().unwrap().0);
        }
    }
    fn find_median(&self) -> f64 {
        if self.lo.len() > self.hi.len() { *self.lo.peek().unwrap() as f64 }
        else { (*self.lo.peek().unwrap() + self.hi.peek().unwrap().0) as f64 / 2.0 }
    }
}

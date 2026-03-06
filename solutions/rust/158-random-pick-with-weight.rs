/**
 * Problem 158: Random Pick with Weight (LeetCode 528)
 * Difficulty: Med
 * Language: Rust
 */
use rand::Rng;
struct WeightedPicker { prefix: Vec<i32> }
impl WeightedPicker {
    fn new(w: &[i32]) -> Self {
        let prefix = w.iter().scan(0, |s, &x| { *s += x; Some(*s) }).collect();
        Self { prefix }
    }
    fn pick(&self) -> usize {
        let target = rand::thread_rng().gen_range(1..=*self.prefix.last().unwrap());
        self.prefix.partition_point(|&x| x < target)
    }
}

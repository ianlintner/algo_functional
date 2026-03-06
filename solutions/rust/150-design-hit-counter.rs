/**
 * Problem 150: Design Hit Counter (LeetCode 362)
 * Difficulty: Med
 * Language: Rust
 */
struct HitCounter { hits: Vec<i32> }
impl HitCounter {
    fn new() -> Self { HitCounter { hits: vec![] } }
    fn hit(&self, timestamp: i32) -> Self {
        let mut h = self.hits.clone(); h.push(timestamp);
        HitCounter { hits: h }
    }
    fn get_hits(&self, timestamp: i32) -> (i32, Self) {
        let filtered: Vec<i32> = self.hits.iter()
            .filter(|&&t| t > timestamp - 300).cloned().collect();
        (filtered.len() as i32, HitCounter { hits: filtered })
    }
}

/**
 * Problem 32: Combination Sum (LeetCode 39)
 * Difficulty: Med
 * Language: Rust
 */
pub fn combination_sum(candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    fn go(cands: &[i32], remain: i32, curr: Vec<i32>) -> Vec<Vec<i32>> {
        if remain == 0 { return vec![curr]; }
        if cands.is_empty() || cands[0] > remain { return vec![]; }
        let mut with = curr.clone();
        with.push(cands[0]);
        let mut result = go(cands, remain - cands[0], with);
        result.extend(go(&cands[1..], remain, curr));
        result
    }
    let mut sorted = candidates;
    sorted.sort();
    go(&sorted, target, vec![])
}

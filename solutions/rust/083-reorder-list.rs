/**
 * Problem 83: Reorder List (LeetCode 143)
 * Difficulty: Med
 * Language: Rust
 */
fn reorder_list(head: Vec<i32>) -> Vec<i32> {
    let mid = head.len() / 2;
    let first = &head[..mid];
    let second: Vec<_> = head[mid..].iter().rev().cloned().collect();
    first.iter().zip(second.iter())
        .flat_map(|(&a, &b)| vec![a, b])
        .chain(if first.len() < second.len() { vec![second[second.len()-1]] } else { vec![] })
        .collect()
}

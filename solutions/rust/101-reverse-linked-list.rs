/**
 * Problem 101: Reverse Linked List (LeetCode 206)
 * Difficulty: Easy
 * Language: Rust
 */
fn reverse_list<T: Clone>(list: &[T]) -> Vec<T> {
    list.iter().fold(Vec::new(), |mut acc, x| {
        acc.insert(0, x.clone());
        acc
    })
    // For linked list: fold with accumulator building reversed list
}

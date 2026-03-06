/**
 * Problem 155: Ransom Note (LeetCode 383)
 * Difficulty: Easy
 * Language: Rust
 */
fn can_construct(ransom: &str, magazine: &str) -> bool {
    let freq = magazine.chars().fold(std::collections::HashMap::new(), |mut m, c| {
        *m.entry(c).or_insert(0) += 1; m
    });
    ransom.chars().fold((freq, true), |(mut m, ok), c| {
        let cnt = m.entry(c).or_insert(0);
        *cnt -= 1;
        (m, ok && *cnt >= 0)
    }).1
}

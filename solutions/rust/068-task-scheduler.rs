/**
 * Problem 68: Task Scheduler (LeetCode 621)
 * Difficulty: Med
 * Language: Rust
 */
fn least_interval(tasks: &[char], n: i32) -> i32 {
    let mut freq = [0i32; 26];
    for &t in tasks { freq[(t as u8 - b'A') as usize] += 1; }
    let max_freq = *freq.iter().max().unwrap();
    let max_count = freq.iter().filter(|&&f| f == max_freq).count() as i32;
    (tasks.len() as i32).max((max_freq - 1) * (n + 1) + max_count)
}

/**
 * Problem 140: Longest Increasing Subsequence (LeetCode 300)
 * Difficulty: Med
 * Language: Rust
 */
fn length_of_lis(nums: &[i32]) -> usize {
    nums.iter().fold(vec![], |mut tails, &num| {
        match tails.binary_search(&num) {
            Ok(pos) => tails[pos] = num,
            Err(pos) => if pos == tails.len() { tails.push(num) }
                        else { tails[pos] = num },
        }
        tails
    }).len()
}

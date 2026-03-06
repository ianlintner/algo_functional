/**
 * Problem 56: Subsets (LeetCode 78)
 * Difficulty: Med
 * Language: Rust
 */
fn subsets(nums: &[i32]) -> Vec<Vec<i32>> {
    nums.iter().fold(vec![vec![]], |acc, &num| {
        let mut next = acc.clone();
        for sub in &acc {
            let mut s = sub.clone();
            s.push(num);
            next.push(s);
        }
        next
    })
}

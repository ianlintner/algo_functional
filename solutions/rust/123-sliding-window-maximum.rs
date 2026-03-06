/**
 * Problem 123: Sliding Window Maximum (LeetCode 239)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::VecDeque;
fn max_sliding_window(nums: &[i32], k: usize) -> Vec<i32> {
    let (_, res) = nums.iter().enumerate().fold(
        (VecDeque::new(), vec![]),
        |(mut dq, mut res), (i, &v)| {
            while dq.front().map_or(false, |&j| j + k <= i) { dq.pop_front(); }
            while dq.back().map_or(false, |&j| nums[j] <= v) { dq.pop_back(); }
            dq.push_back(i);
            if i >= k - 1 { res.push(nums[*dq.front().unwrap()]); }
            (dq, res)
        });
    res
}

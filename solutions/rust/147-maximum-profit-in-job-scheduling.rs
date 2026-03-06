/**
 * Problem 147: Maximum Profit in Job Scheduling (LeetCode 1235)
 * Difficulty: Hard
 * Language: Rust
 */
fn job_scheduling(start: &[i32], end_t: &[i32], profit: &[i32]) -> i32 {
    let mut jobs: Vec<(i32,i32,i32)> = start.iter().zip(end_t).zip(profit)
        .map(|((&s,&e),&p)| (s,e,p)).collect();
    jobs.sort_by_key(|&(_,e,_)| e);
    let n = jobs.len();
    let ends: Vec<i32> = jobs.iter().map(|&(_,e,_)| e).collect();
    let bisect = |val: i32, hi: usize| -> usize {
        match ends[..hi].iter().rposition(|&e| e <= val) {
            Some(i) => i + 1, None => 0
        }
    };
    (1..=n).fold(vec![0i32; n+1], |mut dp, i| {
        let prev = bisect(jobs[i-1].0, i-1);
        dp[i] = dp[i-1].max(dp[prev] + jobs[i-1].2);
        dp
    })[n]
}

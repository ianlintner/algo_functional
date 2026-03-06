/**
 * Problem 39: N-Queens (LeetCode 51)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::HashSet;

pub fn solve_n_queens(n: i32) -> Vec<Vec<String>> {
    fn go(row: i32, n: i32, cols: &HashSet<i32>, d1: &HashSet<i32>,
          d2: &HashSet<i32>, board: &[i32]) -> Vec<Vec<String>> {
        if row == n {
            return vec![board.iter().map(|&c| {
                let mut s = ".".repeat(n as usize);
                s.replace_range(c as usize..c as usize + 1, "Q");
                s
            }).collect()];
        }
        (0..n).filter(|c| !cols.contains(c) && !d1.contains(&(row - c))
                        && !d2.contains(&(row + c)))
            .flat_map(|c| {
                let mut cs = cols.clone(); cs.insert(c);
                let mut dd1 = d1.clone(); dd1.insert(row - c);
                let mut dd2 = d2.clone(); dd2.insert(row + c);
                let mut b = board.to_vec(); b.push(c);
                go(row + 1, n, &cs, &dd1, &dd2, &b)
            }).collect()
    }
    go(0, n, &HashSet::new(), &HashSet::new(), &HashSet::new(), &[])
}

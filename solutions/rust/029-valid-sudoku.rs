/**
 * Problem 29: Valid Sudoku (LeetCode 36)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashSet;

pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
    let (count, set) = board.iter().enumerate().fold(
        (0usize, HashSet::new()),
        |(cnt, set), (i, row)| {
            row.iter().enumerate().fold((cnt, set), |(cnt, mut set), (j, &c)| {
                if c == '.' { (cnt, set) }
                else {
                    set.insert(format!("r{}:{}", i, c));
                    set.insert(format!("c{}:{}", j, c));
                    set.insert(format!("b{},{}:{}", i/3, j/3, c));
                    (cnt + 3, set)
                }
            })
        }
    );
    count == set.len()
}

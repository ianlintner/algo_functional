/**
 * Problem 30: Sudoku Solver (LeetCode 37)
 * Difficulty: Hard
 * Language: Rust
 */
pub fn solve_sudoku(board: &mut Vec<Vec<char>>) {
    fn is_valid(board: &Vec<Vec<char>>, r: usize, c: usize, d: char) -> bool {
        let br = (r / 3) * 3;
        let bc = (c / 3) * 3;
        (0..9).all(|i| board[r][i] != d) &&
        (0..9).all(|i| board[i][c] != d) &&
        (0..3).all(|i| (0..3).all(|j| board[br+i][bc+j] != d))
    }

    fn solve(board: &mut Vec<Vec<char>>) -> bool {
        for i in 0..9 {
            for j in 0..9 {
                if board[i][j] == '.' {
                    for d in '1'..='9' {
                        if is_valid(board, i, j, d) {
                            board[i][j] = d;
                            if solve(board) { return true; }
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        true
    }
    solve(board);
}

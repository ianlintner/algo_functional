/**
 * Problem 30: Sudoku Solver (LeetCode 37)
 * Difficulty: Hard
 * Language: TypeScript
 */
function solveSudoku(board: string[][]): void {
  const digits = '123456789'.split('');

  const isValid = (board: string[][], r: number, c: number, d: string): boolean =>
    board[r].every(v => v !== d) &&
    board.every(row => row[c] !== d) &&
    board.slice(Math.floor(r/3)*3, Math.floor(r/3)*3+3)
      .every(row => row.slice(Math.floor(c/3)*3, Math.floor(c/3)*3+3)
        .every(v => v !== d));

  const solve = (board: string[][]): string[][] | null => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '.') {
          for (const d of digits) {
            if (isValid(board, i, j, d)) {
              const newBoard = board.map(r => [...r]);
              newBoard[i][j] = d;
              const result = solve(newBoard);
              if (result) return result;
            }
          }
          return null;
        }
      }
    }
    return board;
  };

  const result = solve(board);
  if (result) result.forEach((row, i) => row.forEach((v, j) => board[i][j] = v));
}

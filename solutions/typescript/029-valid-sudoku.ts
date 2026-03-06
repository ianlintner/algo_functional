/**
 * Problem 29: Valid Sudoku (LeetCode 36)
 * Difficulty: Med
 * Language: TypeScript
 */
function isValidSudoku(board: string[][]): boolean {
  const seen = board.reduce<Set<string>>((acc, row, i) =>
    row.reduce((acc2, cell, j) => {
      if (cell === '.') return acc2;
      const keys = [
        `r${i}:${cell}`,
        `c${j}:${cell}`,
        `b${Math.floor(i/3)},${Math.floor(j/3)}:${cell}`
      ];
      keys.forEach(k => acc2.add(k));
      return acc2;
    }, acc)
  , new Set());
  // Check no duplicates by counting
  let count = 0;
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell !== '.') count += 3;
    })
  );
  return seen.size === count;
}

/**
 * Problem 39: N-Queens (LeetCode 51)
 * Difficulty: Hard
 * Language: TypeScript
 */
function solveNQueens(n: number): string[][] {
  const go = (row: number, cols: Set<number>, diag1: Set<number>,
              diag2: Set<number>, board: number[]): string[][] => {
    if (row === n) {
      return [board.map(c =>
        '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1))];
    }
    return Array.from({ length: n }, (_, c) => c)
      .filter(c => !cols.has(c) && !diag1.has(row - c) && !diag2.has(row + c))
      .flatMap(c =>
        go(row + 1,
           new Set([...cols, c]),
           new Set([...diag1, row - c]),
           new Set([...diag2, row + c]),
           [...board, c])
      );
  };
  return go(0, new Set(), new Set(), new Set(), []);
}

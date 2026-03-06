/**
 * Problem 57: Word Search (LeetCode 79)
 * Difficulty: Med
 * Language: TypeScript
 */
function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0].length;
  const dfs = (r: number, c: number, i: number, visited: Set<string>): boolean => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    const key = \`\${r},\${c}\`;
    if (visited.has(key) || board[r][c] !== word[i]) return false;
    const next = new Set([...visited, key]);
    return [[r+1,c],[r-1,c],[r,c+1],[r,c-1]].some(
      ([nr,nc]) => dfs(nr, nc, i+1, next)
    );
  };
  return board.some((row, r) =>
    row.some((_, c) => dfs(r, c, 0, new Set()))
  );
}

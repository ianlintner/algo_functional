/**
 * Problem 146: Longest Increasing Path in a Matrix (LeetCode 329)
 * Difficulty: Hard
 * Language: TypeScript
 */
function longestIncreasingPath(matrix: number[][]): number {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const memo = new Map<string, number>();
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  const dfs = (r: number, c: number): number => {
    const key = r + "," + c;
    if (memo.has(key)) return memo.get(key)!;
    const best = dirs.reduce((mx, [dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] > matrix[r][c])
        return Math.max(mx, dfs(nr, nc));
      return mx;
    }, 0);
    memo.set(key, best + 1);
    return best + 1;
  };
  return matrix.reduce((mx, row, r) =>
    row.reduce((mx2, _, c) => Math.max(mx2, dfs(r, c)), mx), 0);
}

/**
 * Problem 161: Pacific Atlantic Water Flow (LeetCode 417)
 * Difficulty: Med
 * Language: TypeScript
 */
function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length, cols = heights[0].length;
  const dfs = (reachable: boolean[][], r: number, c: number): void => {
    reachable[r][c] = true;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
          !reachable[nr][nc] && heights[nr][nc] >= heights[r][c])
        dfs(reachable, nr, nc);
    });
  };
  const pacific = Array.from({length: rows}, () => Array(cols).fill(false));
  const atlantic = Array.from({length: rows}, () => Array(cols).fill(false));
  for (let r = 0; r < rows; r++) { dfs(pacific, r, 0); dfs(atlantic, r, cols - 1); }
  for (let c = 0; c < cols; c++) { dfs(pacific, 0, c); dfs(atlantic, rows - 1, c); }
  return Array.from({length: rows}, (_, r) =>
    Array.from({length: cols}, (_, c) => [r, c])
  ).flat().filter(([r, c]) => pacific[r][c] && atlantic[r][c]);
}

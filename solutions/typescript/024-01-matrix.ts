/**
 * Problem 24: 01 Matrix (LeetCode 542)
 * Difficulty: Med
 * Language: TypeScript
 */
function updateMatrix(mat: number[][]): number[][] {
  const rows = mat.length, cols = mat[0].length;
  const INF = rows + cols;

  // Functional BFS with immutable state
  const initial = mat.map((row, r) =>
    row.map((v, c) => (v === 0 ? 0 : INF))
  );

  // Top-left pass
  const afterTL = initial.map((row, r) =>
    row.map((v, c) => {
      const top = r > 0 ? initial[r - 1][c] + 1 : INF;
      const left = c > 0 ? row[c - 1] + 1 : INF;
      return Math.min(v, top, left);
    })
  );

  // Bottom-right pass (fold from bottom-right)
  const result = [...afterTL].reverse().map((row, ri) => {
    const r = rows - 1 - ri;
    return [...row].reverse().map((v, ci) => {
      const c = cols - 1 - ci;
      const bottom = r < rows - 1 ? afterTL[r + 1][c] + 1 : INF;
      const right = c < cols - 1 ? afterTL[r][c + 1] + 1 : INF;
      const minVal = Math.min(v, bottom, right);
      afterTL[r][c] = minVal;
      return minVal;
    }).reverse();
  }).reverse();

  return result;
}

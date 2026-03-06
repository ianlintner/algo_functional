/**
 * Problem 51: Set Matrix Zeroes (LeetCode 73)
 * Difficulty: Med
 * Language: TypeScript
 */
function setZeroes(matrix: number[][]): number[][] {
  const zeroRows = new Set(
    matrix.flatMap((row, i) => (row.includes(0) ? [i] : []))
  );
  const zeroCols = new Set(
    matrix[0].flatMap((_, j) => (matrix.some(r => r[j] === 0) ? [j] : []))
  );
  return matrix.map((row, i) =>
    row.map((val, j) => (zeroRows.has(i) || zeroCols.has(j) ? 0 : val))
  );
}

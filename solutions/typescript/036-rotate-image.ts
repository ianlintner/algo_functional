/**
 * Problem 36: Rotate Image (LeetCode 48)
 * Difficulty: Med
 * Language: TypeScript
 */
function rotate(matrix: number[][]): number[][] {
  const n = matrix.length;
  // Transpose then reverse each row (pure)
  const transposed = matrix.map((_, i) =>
    matrix.map((_, j) => matrix[j][i])
  );
  return transposed.map(row => [...row].reverse());
}

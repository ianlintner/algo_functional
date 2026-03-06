/**
 * Problem 110: Maximal Square (LeetCode 221)
 * Difficulty: Med
 * Language: TypeScript
 */
function maximalSquare(matrix: string[][]): number {
  const [mx] = matrix.reduce<[number, number[]]>(
    ([best, prev], row, r) => {
      const curr = row.reduce<number[]>((acc, cell, c) => [
        ...acc,
        cell === '0' ? 0
          : (r === 0 || c === 0) ? 1
          : Math.min(prev[c-1], prev[c], acc[c-1]) + 1
      ], []);
      return [Math.max(best, ...curr), curr];
    }, [0, []]
  );
  return mx * mx;
}

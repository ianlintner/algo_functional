/**
 * Problem 52: Search a 2D Matrix (LeetCode 74)
 * Difficulty: Med
 * Language: TypeScript
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const flat = matrix.flat();
  const go = (lo: number, hi: number): boolean => {
    if (lo > hi) return false;
    const mid = Math.floor((lo + hi) / 2);
    if (flat[mid] === target) return true;
    return flat[mid] < target ? go(mid + 1, hi) : go(lo, mid - 1);
  };
  return go(0, flat.length - 1);
}

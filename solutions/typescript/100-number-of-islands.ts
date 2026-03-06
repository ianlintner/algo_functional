/**
 * Problem 100: Number of Islands (LeetCode 200)
 * Difficulty: Med
 * Language: TypeScript
 */
function numIslands(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const key = (r: number, c: number) => \`${r},${c}\`;
  const flood = (r: number, c: number, visited: Set<string>): Set<string> => {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return visited;
    if (grid[r][c] !== '1' || visited.has(key(r, c))) return visited;
    const v = new Set(visited).add(key(r, c));
    return [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].reduce(
      (acc, [nr, nc]) => flood(nr, nc, acc), v
    );
  };
  const [count] = Array.from({ length: rows * cols }).reduce<[number, Set<string>]>(
    ([cnt, vis], _, idx) => {
      const r = Math.floor(idx / cols), c = idx % cols;
      if (grid[r][c] !== '1' || vis.has(key(r, c))) return [cnt, vis];
      return [cnt + 1, flood(r, c, vis)];
    },
    [0, new Set<string>()]
  );
  return count;
}

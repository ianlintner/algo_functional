/**
 * Problem 31: Shortest Path to Get Food (LeetCode 1730)
 * Difficulty: Med
 * Language: TypeScript
 */
function getFood(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  const start = grid.reduce<[number, number]>((acc, row, i) => {
    const j = row.indexOf('*');
    return j !== -1 ? [i, j] : acc;
  }, [0, 0]);

  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  const bfs = (queue: [number, number, number][], visited: Set<string>): number => {
    if (queue.length === 0) return -1;
    const next: [number, number, number][] = [];
    for (const [r, c, d] of queue) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        const key = `${nr},${nc}`;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
            grid[nr][nc] !== 'X' && !visited.has(key)) {
          if (grid[nr][nc] === '#') return d + 1;
          visited.add(key);
          next.push([nr, nc, d + 1]);
        }
      }
    }
    return bfs(next, visited);
  };

  const visited = new Set<string>([`${start[0]},${start[1]}`]);
  return bfs([[start[0], start[1], 0]], visited);
}

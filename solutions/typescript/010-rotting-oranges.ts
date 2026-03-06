/**
 * Problem 10: Rotting Oranges (LeetCode 994)
 * Difficulty: Med
 * Language: TypeScript
 */
function orangesRotting(grid: number[][]): number {
  const rows = grid.length, cols = grid[0].length;
  type State = { grid: number[][]; queue: [number, number][]; time: number };

  const neighbors = (r: number, c: number): [number, number][] =>
    [[r-1,c],[r+1,c],[r,c-1],[r,c+1]]
      .filter(([nr,nc]) => nr >= 0 && nr < rows && nc >= 0 && nc < cols) as [number,number][];

  const initial: State = {
    grid: grid.map(row => [...row]),
    queue: grid.flatMap((row, r) =>
      row.map((v, c) => v === 2 ? [r, c] as [number, number] : null).filter(Boolean) as [number, number][]),
    time: 0,
  };

  const bfs = (state: State): number => {
    if (state.queue.length === 0) {
      return state.grid.some(row => row.includes(1)) ? -1 : state.time;
    }
    const nextQueue: [number, number][] = [];
    const newGrid = state.grid.map(row => [...row]);
    state.queue.forEach(([r, c]) => {
      neighbors(r, c).forEach(([nr, nc]) => {
        if (newGrid[nr][nc] === 1) {
          newGrid[nr][nc] = 2;
          nextQueue.push([nr, nc]);
        }
      });
    });
    return nextQueue.length === 0
      ? (newGrid.some(row => row.includes(1)) ? -1 : state.time)
      : bfs({ grid: newGrid, queue: nextQueue, time: state.time + 1 });
  };

  return bfs(initial);
}

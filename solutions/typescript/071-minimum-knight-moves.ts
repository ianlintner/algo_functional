/**
 * Problem 71: Minimum Knight Moves (LeetCode 1197)
 * Difficulty: Med
 * Language: TypeScript
 */
function minKnightMoves(x: number, y: number): number {
  const tx = Math.abs(x), ty = Math.abs(y);
  const key = (a: number, b: number) => `${a},${b}`;
  const bfs = (queue: [number, number, number][], visited: Set<string>): number => {
    if (queue.length === 0) return -1;
    const [cx, cy, d] = queue[0];
    if (cx === tx && cy === ty) return d;
    const rest = queue.slice(1);
    const moves = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]];
    const next = moves
      .map(([dx, dy]) => [cx+dx, cy+dy, d+1] as [number, number, number])
      .filter(([nx, ny]) => nx >= -2 && ny >= -2 && !visited.has(key(nx, ny)));
    const newVisited = new Set(visited);
    next.forEach(([nx, ny]) => newVisited.add(key(nx, ny)));
    return bfs([...rest, ...next], newVisited);
  };
  const init = new Set([key(0, 0)]);
  return bfs([[0, 0, 0]], init);
}

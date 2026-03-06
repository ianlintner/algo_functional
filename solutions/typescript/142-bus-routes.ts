/**
 * Problem 142: Bus Routes (LeetCode 815)
 * Difficulty: Hard
 * Language: TypeScript
 */
function numBusesToDestination(routes: number[][], source: number, target: number): number {
  if (source === target) return 0;
  const stopToRoutes = new Map<number, number[]>();
  routes.forEach((route, i) =>
    route.forEach(stop => {
      if (!stopToRoutes.has(stop)) stopToRoutes.set(stop, []);
      stopToRoutes.get(stop)!.push(i);
    }));
  const visited = new Set<number>();
  const visitedRoutes = new Set<number>();
  const bfs = (queue: number[][], buses: number): number => {
    if (queue.length === 0) return -1;
    const nextQueue: number[][] = [];
    for (const [stop] of queue) {
      if (stop === target) return buses;
      for (const ri of (stopToRoutes.get(stop) || [])) {
        if (visitedRoutes.has(ri)) continue;
        visitedRoutes.add(ri);
        for (const ns of routes[ri]) {
          if (!visited.has(ns)) { visited.add(ns); nextQueue.push([ns]); }
        }
      }
    }
    return bfs(nextQueue, buses + 1);
  };
  visited.add(source);
  return bfs([[source]], 0);
}

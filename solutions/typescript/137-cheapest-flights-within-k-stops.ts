/**
 * Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
 * Difficulty: Med
 * Language: TypeScript
 */
function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  const INF = Infinity;
  const initPrices = Array(n).fill(INF);
  initPrices[src] = 0;
  const relax = (prices: number[], _: number): number[] =>
    flights.reduce((next, [u, v, w]) => {
      if (prices[u] < INF && prices[u] + w < next[v]) {
        const copy = [...next];
        copy[v] = prices[u] + w;
        return copy;
      }
      return next;
    }, [...prices]);
  const finalPrices = Array.from({ length: k + 1 }).reduce<number[]>(
    (acc) => relax(acc, 0), initPrices);
  return finalPrices[dst] === INF ? -1 : finalPrices[dst];
}

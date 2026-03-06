/**
 * Problem 143: Coin Change (LeetCode 322)
 * Difficulty: Med
 * Language: TypeScript
 */
function coinChange(coins: number[], amount: number): number {
  const INF = amount + 1;
  const dp = Array.from({ length: amount + 1 }, (_, i) => i === 0 ? 0 : INF);
  const result = coins.reduce(
    (table, coin) => table.map((val, i) =>
      i >= coin ? Math.min(val, table[i - coin] + 1) : val),
    dp
  );
  return result[amount] >= INF ? -1 : result[amount];
}

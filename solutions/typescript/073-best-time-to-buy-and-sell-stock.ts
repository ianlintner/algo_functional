/**
 * Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
 * Difficulty: Easy
 * Language: TypeScript
 */
function maxProfit(prices: number[]): number {
  return prices.reduce(
    (acc, price) => ({
      minPrice: Math.min(acc.minPrice, price),
      profit: Math.max(acc.profit, price - acc.minPrice),
    }),
    { minPrice: Infinity, profit: 0 }
  ).profit;
}

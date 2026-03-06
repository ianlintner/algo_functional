/**
 * Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
 * Difficulty: Easy
 * Language: Scala
 */
def maxProfit(prices: List[Int]): Int =
  prices.foldLeft((Int.MaxValue, 0)) { case ((mn, mx), p) =>
    (mn.min(p), mx.max(p - mn))
  }._2

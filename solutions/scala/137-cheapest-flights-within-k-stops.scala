/**
 * Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
 * Difficulty: Med
 * Language: Scala
 */
def findCheapestPrice(n: Int, flights: Array[Array[Int]], src: Int, dst: Int, k: Int): Int = {
  val inf = Int.MaxValue
  val init = (0 until n).map(i => if (i == src) 0 else inf).toArray
  val finalP = (0 to k).foldLeft(init) { (prices, _) =>
    flights.foldLeft(prices.clone()) { (next, f) =>
      val Array(u, v, w) = f
      if (prices(u) < inf && prices(u) + w < next(v)) { next(v) = prices(u) + w; next }
      else next
    }
  }
  if (finalP(dst) == inf) -1 else finalP(dst)
}

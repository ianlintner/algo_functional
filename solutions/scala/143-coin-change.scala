/**
 * Problem 143: Coin Change (LeetCode 322)
 * Difficulty: Med
 * Language: Scala
 */
def coinChange(coins: Array[Int], amount: Int): Int = {
  val inf = amount + 1
  val dp = (0 to amount).map(i => if (i == 0) 0 else inf).toArray
  val result = coins.foldLeft(dp) { (table, coin) =>
    table.zipWithIndex.map { case (v, i) =>
      if (i >= coin) math.min(v, table(i - coin) + 1) else v
    }
  }
  if (result(amount) >= inf) -1 else result(amount)
}

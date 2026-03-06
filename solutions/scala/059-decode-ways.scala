/**
 * Problem 59: Decode Ways (LeetCode 91)
 * Difficulty: Med
 * Language: Scala
 */
def numDecodings(s: String): Int = {
  val n = s.length
  (0 until n).reverse.foldLeft((1, 0)) { case ((dp1, dp2), i) =>
    if (s(i) == '0') (0, dp1)
    else {
      val one = dp1
      val two = if (i + 1 < n && s.substring(i, i + 2).toInt <= 26) dp2 else 0
      (one + two, dp1)
    }
  }._1
}

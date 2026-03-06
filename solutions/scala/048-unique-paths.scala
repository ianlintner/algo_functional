/**
 * Problem 48: Unique Paths (LeetCode 62)
 * Difficulty: Med
 * Language: Scala
 */
def uniquePaths(m: Int, n: Int): Int = {
  val k = m.min(n) - 1
  (0 until k).foldLeft(1L) { (acc, i) =>
    acc * (m + n - 2 - i) / (i + 1)
  }.toInt
}

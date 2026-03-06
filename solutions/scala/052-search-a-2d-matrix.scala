/**
 * Problem 52: Search a 2D Matrix (LeetCode 74)
 * Difficulty: Med
 * Language: Scala
 */
def searchMatrix(matrix: Array[Array[Int]], target: Int): Boolean = {
  val flat = matrix.flatten
  def go(lo: Int, hi: Int): Boolean = {
    if (lo > hi) false
    else {
      val mid = (lo + hi) / 2
      if (flat(mid) == target) true
      else if (flat(mid) < target) go(mid + 1, hi)
      else go(lo, mid - 1)
    }
  }
  go(0, flat.length - 1)
}

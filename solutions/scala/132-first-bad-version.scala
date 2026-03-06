/**
 * Problem 132: First Bad Version (LeetCode 278)
 * Difficulty: Easy
 * Language: Scala
 */
def firstBadVersion(n: Int, isBad: Int => Boolean): Int = {
  def search(lo: Int, hi: Int): Int = {
    if (lo >= hi) lo
    else {
      val mid = lo + (hi - lo) / 2
      if (isBad(mid)) search(lo, mid) else search(mid + 1, hi)
    }
  }
  search(1, n)
}

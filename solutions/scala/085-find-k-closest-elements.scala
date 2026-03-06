/**
 * Problem 85: Find K Closest Elements (LeetCode 658)
 * Difficulty: Med
 * Language: Scala
 */
def findClosestElements(arr: Vector[Int], k: Int, x: Int): Vector[Int] = {
  @annotation.tailrec
  def go(lo: Int, hi: Int): Vector[Int] = {
    if (hi - lo == k) arr.slice(lo, hi)
    else if ((arr(lo) - x).abs <= (arr(hi-1) - x).abs) go(lo, hi - 1)
    else go(lo + 1, hi)
  }
  go(0, arr.length)
}

/**
 * Problem 9: Container With Most Water (LeetCode 11)
 * Difficulty: Med
 * Language: Scala
 */
def maxArea(height: Array[Int]): Int = {
  @annotation.tailrec
  def solve(l: Int, r: Int, best: Int): Int = {
    if (l >= r) best
    else {
      val area = math.min(height(l), height(r)) * (r - l)
      val newBest = math.max(best, area)
      if (height(l) < height(r)) solve(l + 1, r, newBest)
      else solve(l, r - 1, newBest)
    }
  }
  solve(0, height.length - 1, 0)
}

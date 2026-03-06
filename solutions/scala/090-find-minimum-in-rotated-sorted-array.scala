/**
 * Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
 * Difficulty: Med
 * Language: Scala
 */
def findMin(nums: Vector[Int]): Int = {
  @annotation.tailrec
  def go(lo: Int, hi: Int): Int = {
    if (lo == hi) nums(lo)
    else {
      val mid = (lo + hi) / 2
      if (nums(mid) > nums(hi)) go(mid + 1, hi) else go(lo, mid)
    }
  }
  go(0, nums.length - 1)
}

/**
 * Problem 27: Search in Rotated Sorted Array (LeetCode 33)
 * Difficulty: Med
 * Language: Scala
 */
def search(nums: Array[Int], target: Int): Int = {
  @annotation.tailrec
  def go(lo: Int, hi: Int): Int = {
    if (lo > hi) -1
    else {
      val mid = (lo + hi) / 2
      if (nums(mid) == target) mid
      else if (nums(lo) <= nums(mid)) {
        if (target >= nums(lo) && target < nums(mid)) go(lo, mid - 1)
        else go(mid + 1, hi)
      } else {
        if (target > nums(mid) && target <= nums(hi)) go(mid + 1, hi)
        else go(lo, mid - 1)
      }
    }
  }
  go(0, nums.length - 1)
}

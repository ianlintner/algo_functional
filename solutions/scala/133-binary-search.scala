/**
 * Problem 133: Binary Search (LeetCode 704)
 * Difficulty: Easy
 * Language: Scala
 */
def binarySearch(nums: Array[Int], target: Int): Int = {
  def search(lo: Int, hi: Int): Int = {
    if (lo > hi) -1
    else {
      val mid = lo + (hi - lo) / 2
      if (nums(mid) == target) mid
      else if (nums(mid) < target) search(mid + 1, hi)
      else search(lo, mid - 1)
    }
  }
  search(0, nums.length - 1)
}

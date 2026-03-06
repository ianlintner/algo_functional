/**
 * Problem 89: Maximum Product Subarray (LeetCode 152)
 * Difficulty: Med
 * Language: Scala
 */
def maxProduct(nums: List[Int]): Int = {
  val (best, _, _) = nums.tail.foldLeft((nums.head, nums.head, nums.head)) {
    case ((best, mx, mn), n) =>
      val hi = Seq(n, mx * n, mn * n).max
      val lo = Seq(n, mx * n, mn * n).min
      (best max hi, hi, lo)
  }
  best
}

/**
 * Problem 41: Maximum Subarray (LeetCode 53)
 * Difficulty: Med
 * Language: Scala
 */
def maxSubArray(nums: Array[Int]): Int =
  nums.tail.foldLeft((nums.head, nums.head)) { case ((best, cur), n) =>
    val c = n max (cur + n)
    (best max c, c)
  }._1

/**
 * Problem 129: Missing Number (LeetCode 268)
 * Difficulty: Easy
 * Language: Scala
 */
def missingNumber(nums: Array[Int]): Int = {
  val n = nums.length
  nums.foldLeft(0)(_ ^ _) ^ (0 to n).foldLeft(0)(_ ^ _)
}

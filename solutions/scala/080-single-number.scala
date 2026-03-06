/**
 * Problem 80: Single Number (LeetCode 136)
 * Difficulty: Easy
 * Language: Scala
 */
def singleNumber(nums: List[Int]): Int =
  nums.foldLeft(0)(_ ^ _)

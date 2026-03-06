/**
 * Problem 134: Move Zeroes (LeetCode 283)
 * Difficulty: Easy
 * Language: Scala
 */
def moveZeroes(nums: List[Int]): List[Int] = {
  val (zeros, nonZeros) = nums.partition(_ == 0)
  nonZeros ++ zeros
}

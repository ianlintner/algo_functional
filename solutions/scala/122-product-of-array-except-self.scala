/**
 * Problem 122: Product of Array Except Self (LeetCode 238)
 * Difficulty: Med
 * Language: Scala
 */
def productExceptSelf(nums: Array[Int]): Array[Int] = {
  val prefix = nums.scanLeft(1)(_ * _).init
  val suffix = nums.scanRight(1)(_ * _).tail
  prefix.zip(suffix).map { case (a, b) => a * b }
}

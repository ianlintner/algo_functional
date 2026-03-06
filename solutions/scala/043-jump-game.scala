/**
 * Problem 43: Jump Game (LeetCode 55)
 * Difficulty: Med
 * Language: Scala
 */
def canJump(nums: Array[Int]): Boolean =
  nums.zipWithIndex.foldLeft(0) { case (reach, (n, i)) =>
    if (i > reach) -1 else reach max (i + n)
  } >= nums.length - 1

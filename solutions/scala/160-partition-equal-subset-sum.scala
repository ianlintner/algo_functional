/**
 * Problem 160: Partition Equal Subset Sum (LeetCode 416)
 * Difficulty: Med
 * Language: Scala
 */
def canPartition(nums: Array[Int]): Boolean = {
  val total = nums.sum
  if (total % 2 != 0) false
  else {
    val target = total / 2
    nums.foldLeft(Set(0)) { (dp, n) =>
      dp ++ dp.map(_ + n)
    }.contains(target)
  }
}

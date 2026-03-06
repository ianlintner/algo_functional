/**
 * Problem 33: First Missing Positive (LeetCode 41)
 * Difficulty: Hard
 * Language: Scala
 */
def firstMissingPositive(nums: Array[Int]): Int = {
  val s = nums.filter(_ > 0).toSet
  Iterator.from(1).find(i => !s.contains(i)).get
}

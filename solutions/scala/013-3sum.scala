/**
 * Problem 13: 3Sum (LeetCode 15)
 * Difficulty: Med
 * Language: Scala
 */
def threeSum(nums: Array[Int]): List[List[Int]] = {
  val sorted = nums.sorted
  val n = sorted.length

  def twoSum(target: Int, lo: Int, hi: Int, acc: List[List[Int]]): List[List[Int]] = {
    if (lo >= hi) acc
    else {
      val sum = sorted(lo) + sorted(hi)
      if (sum < target) twoSum(target, lo + 1, hi, acc)
      else if (sum > target) twoSum(target, lo, hi - 1, acc)
      else {
        val triple = List(-target, sorted(lo), sorted(hi))
        val newLo = (lo + 1 to hi).find(i => sorted(i) != sorted(lo)).getOrElse(hi)
        twoSum(target, newLo, hi - 1, triple :: acc)
      }
    }
  }

  (0 until n).foldLeft(List.empty[List[Int]]) { (acc, i) =>
    if (i > 0 && sorted(i) == sorted(i - 1)) acc
    else acc ++ twoSum(-sorted(i), i + 1, n - 1, Nil)
  }
}

/**
 * Problem 40: Subarray Sum Equals K (LeetCode 560)
 * Difficulty: Med
 * Language: Scala
 */
def subarraySum(nums: Array[Int], k: Int): Int = {
  nums.foldLeft((0, 0, Map(0 -> 1))) { case ((count, sum, map), n) =>
    val s = sum + n
    val c = count + map.getOrElse(s - k, 0)
    val m = map + (s -> (map.getOrElse(s, 0) + 1))
    (c, s, m)
  }._1
}

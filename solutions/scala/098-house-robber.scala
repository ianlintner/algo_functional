/**
 * Problem 98: House Robber (LeetCode 198)
 * Difficulty: Med
 * Language: Scala
 */
def rob(nums: List[Int]): Int =
  nums.foldLeft((0, 0)) { case ((p1, p2), n) =>
    (p1 max (p2 + n), p1)
  }._1

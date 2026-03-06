/**
 * Problem 50: Climbing Stairs (LeetCode 70)
 * Difficulty: Easy
 * Language: Scala
 */
def climbStairs(n: Int): Int =
  (1 until n).foldLeft((1, 1)) { case ((a, b), _) => (b, a + b) }._1

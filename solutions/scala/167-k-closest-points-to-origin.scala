/**
 * Problem 167: K Closest Points to Origin (LeetCode 973)
 * Difficulty: Med
 * Language: Scala
 */
def kClosest(points: Array[Array[Int]], k: Int): Array[Array[Int]] =
  points.sortBy(p => p(0) * p(0) + p(1) * p(1)).take(k)

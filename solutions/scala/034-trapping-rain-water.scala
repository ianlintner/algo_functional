/**
 * Problem 34: Trapping Rain Water (LeetCode 42)
 * Difficulty: Hard
 * Language: Scala
 */
def trap(height: Array[Int]): Int = {
  val maxLeft = height.scanLeft(0)(_ max _).tail
  val maxRight = height.scanRight(0)(_ max _).init
  height.indices.map(i =>
    (maxLeft(i) min maxRight(i)) - height(i) max 0
  ).sum
}

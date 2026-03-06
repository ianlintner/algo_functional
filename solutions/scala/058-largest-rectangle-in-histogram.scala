/**
 * Problem 58: Largest Rectangle in Histogram (LeetCode 84)
 * Difficulty: Hard
 * Language: Scala
 */
def largestRectangleArea(heights: Array[Int]): Int = {
  val n = heights.length
  def process(idx: Int, stack: List[Int], maxA: Int): Int =
    if (idx == n) clean(stack, maxA)
    else if (stack.nonEmpty && heights(stack.head) > heights(idx)) {
      val top :: rest = stack: @unchecked
      val w = if (rest.isEmpty) idx else idx - rest.head - 1
      process(idx, rest, maxA max (heights(top) * w))
    } else process(idx + 1, idx :: stack, maxA)
  def clean(stack: List[Int], maxA: Int): Int = stack match {
    case Nil => maxA
    case top :: rest =>
      val w = if (rest.isEmpty) n else n - rest.head - 1
      clean(rest, maxA max (heights(top) * w))
  }
  process(0, Nil, 0)
}

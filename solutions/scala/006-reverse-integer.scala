/**
 * Problem 6: Reverse Integer (LeetCode 7)
 * Difficulty: Med
 * Language: Scala
 */
def reverse(x: Int): Int = {
  val sign = if (x < 0) -1L else 1L
  val reversed = math.abs(x.toLong).toString.reverse.toLong * sign
  if (reversed > Int.MaxValue || reversed < Int.MinValue) 0
  else reversed.toInt
}

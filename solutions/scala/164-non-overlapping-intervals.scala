/**
 * Problem 164: Non-overlapping Intervals (LeetCode 435)
 * Difficulty: Med
 * Language: Scala
 */
def eraseOverlapIntervals(intervals: Array[Array[Int]]): Int = {
  val sorted = intervals.sortBy(_(1))
  sorted.foldLeft((0, Int.MinValue)) { case ((count, end), iv) =>
    if (iv(0) < end) (count + 1, end)
    else (count, iv(1))
  }._1
}

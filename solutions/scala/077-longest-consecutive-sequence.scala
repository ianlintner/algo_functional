/**
 * Problem 77: Longest Consecutive Sequence (LeetCode 128)
 * Difficulty: Med
 * Language: Scala
 */
def longestConsecutive(nums: List[Int]): Int = {
  val s = nums.toSet
  s.foldLeft(0) { (mx, n) =>
    if (s.contains(n - 1)) mx
    else {
      val len = LazyList.from(n).takeWhile(s.contains).length
      mx.max(len)
    }
  }
}

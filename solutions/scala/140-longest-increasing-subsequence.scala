/**
 * Problem 140: Longest Increasing Subsequence (LeetCode 300)
 * Difficulty: Med
 * Language: Scala
 */
def lengthOfLIS(nums: Array[Int]): Int = {
  import java.util
  nums.foldLeft(Vector.empty[Int]) { (tails, num) =>
    val pos = {
      var (lo, hi) = (0, tails.length)
      while (lo < hi) { val mid = (lo + hi) / 2; if (tails(mid) < num) lo = mid + 1 else hi = mid }
      lo
    }
    if (pos == tails.length) tails :+ num
    else tails.updated(pos, num)
  }.length
}

/**
 * Problem 159: Longest Palindrome (LeetCode 409)
 * Difficulty: Easy
 * Language: Scala
 */
def longestPalindrome(s: String): Int = {
  val freq = s.foldLeft(Map.empty[Char, Int]) { (m, ch) =>
    m.updated(ch, m.getOrElse(ch, 0) + 1)
  }
  val pairs = freq.values.foldLeft(0)((acc, cnt) => acc + (cnt / 2) * 2)
  pairs + (if (pairs < s.length) 1 else 0)
}

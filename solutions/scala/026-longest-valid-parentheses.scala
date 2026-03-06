/**
 * Problem 26: Longest Valid Parentheses (LeetCode 32)
 * Difficulty: Hard
 * Language: Scala
 */
def longestValidParentheses(s: String): Int = {
  def scan(cs: Seq[Char], open: Char, close: Char): Int =
    cs.foldLeft((0, 0, 0)) { case ((l, r, mx), c) =>
      val (l2, r2) = if (c == open) (l + 1, r) else (l, r + 1)
      if (r2 > l2) (0, 0, mx)
      else if (l2 == r2) (l2, r2, mx max (2 * r2))
      else (l2, r2, mx)
    }._3
  scan(s, '(', ')') max scan(s.reverse, ')', '(')
}

/**
 * Problem 5: Longest Palindromic Substring (LeetCode 5)
 * Difficulty: Med
 * Language: Scala
 */
def longestPalindrome(s: String): String = {
  def expand(l: Int, r: Int): String = {
    var (ll, rr) = (l, r)
    while (ll >= 0 && rr < s.length && s(ll) == s(rr)) { ll -= 1; rr += 1 }
    s.substring(ll + 1, rr)
  }
  s.indices.foldLeft("") { (best, i) =>
    val odd  = expand(i, i)
    val even = expand(i, i + 1)
    val candidate = if (odd.length >= even.length) odd else even
    if (candidate.length > best.length) candidate else best
  }
}

/**
 * Problem 163: Longest Repeating Character Replacement (LeetCode 424)
 * Difficulty: Med
 * Language: Scala
 */
def characterReplacement(s: String, k: Int): Int = {
  s.indices.foldLeft((0, 0, Map.empty[Char, Int], 0)) {
    case ((left, maxC, freq, best), right) =>
      val ch = s(right)
      val f = freq.updated(ch, freq.getOrElse(ch, 0) + 1)
      val mc = math.max(maxC, f(ch))
      if (right - left + 1 - mc > k) {
        val lf = f.updated(s(left), f(s(left)) - 1)
        (left + 1, mc, lf, math.max(best, right - left))
      } else (left, mc, f, math.max(best, right - left + 1))
  }._4
}

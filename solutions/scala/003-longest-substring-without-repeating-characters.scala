/**
 * Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
 * Difficulty: Med
 * Language: Scala
 */
def lengthOfLongestSubstring(s: String): Int = {
  s.zipWithIndex.foldLeft((0, Map.empty[Char, Int], 0)) {
    case ((left, seen, best), (c, i)) =>
      val newLeft = seen.get(c).map(j => math.max(left, j + 1)).getOrElse(left)
      (newLeft, seen + (c -> i), math.max(best, i - newLeft + 1))
  }._3
}

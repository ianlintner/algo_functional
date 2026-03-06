/**
 * Problem 155: Ransom Note (LeetCode 383)
 * Difficulty: Easy
 * Language: Scala
 */
def canConstruct(ransomNote: String, magazine: String): Boolean = {
  val freq = magazine.foldLeft(Map.empty[Char, Int]) { (m, ch) =>
    m.updated(ch, m.getOrElse(ch, 0) + 1)
  }
  ransomNote.foldLeft((freq, true)) { case ((m, ok), ch) =>
    val cnt = m.getOrElse(ch, 0)
    (m.updated(ch, cnt - 1), ok && cnt > 0)
  }._2
}

/**
 * Problem 148: Palindrome Pairs (LeetCode 336)
 * Difficulty: Hard
 * Language: Scala
 */
def palindromePairs(words: Array[String]): List[List[Int]] = {
  val map = words.zipWithIndex.toMap
  def isPalin(s: String): Boolean = s == s.reverse
  words.zipWithIndex.flatMap { case (w, i) =>
    (0 to w.length).flatMap { j =>
      val (left, right) = w.splitAt(j)
      val a = if (isPalin(right)) map.get(left.reverse).filter(_ != i).map(k => List(i, k)).toList
              else Nil
      val b = if (j > 0 && isPalin(left)) map.get(right.reverse).filter(_ != i).map(k => List(k, i)).toList
              else Nil
      a ++ b
    }
  }.toList
}

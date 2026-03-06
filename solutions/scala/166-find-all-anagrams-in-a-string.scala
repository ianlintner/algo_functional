/**
 * Problem 166: Find All Anagrams in a String (LeetCode 438)
 * Difficulty: Med
 * Language: Scala
 */
def findAnagrams(s: String, p: String): List[Int] = {
  val pFreq = p.groupBy(identity).view.mapValues(_.length).toMap
  val pLen = p.length
  s.indices.foldLeft((List.empty[Int], 0, Map.empty[Char, Int])) {
    case ((result, left, wFreq), right) =>
      val ch = s(right)
      val wf = wFreq.updated(ch, wFreq.getOrElse(ch, 0) + 1)
      val (l2, wf2) = if (right - left + 1 > pLen) {
        val lc = s(left)
        val f = wf(lc) - 1
        (left + 1, if (f == 0) wf - lc else wf.updated(lc, f))
      } else (left, wf)
      if (right - l2 + 1 == pLen && wf2 == pFreq) (l2 :: result, l2, wf2)
      else (result, l2, wf2)
  }._1.reverse
}

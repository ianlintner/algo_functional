/**
 * Problem 11: Roman to Integer (LeetCode 13)
 * Difficulty: Easy
 * Language: Scala
 */
def romanToInt(s: String): Int = {
  val values = Map('I' -> 1, 'V' -> 5, 'X' -> 10, 'L' -> 50,
                   'C' -> 100, 'D' -> 500, 'M' -> 1000)
  s.foldRight((0, 0)) { case (ch, (total, prev)) =>
    val v = values(ch)
    if (v < prev) (total - v, v) else (total + v, v)
  }._1
}

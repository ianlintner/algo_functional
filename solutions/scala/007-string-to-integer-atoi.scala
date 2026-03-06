/**
 * Problem 7: String to Integer (atoi) (LeetCode 8)
 * Difficulty: Med
 * Language: Scala
 */
def myAtoi(s: String): Int = {
  val trimmed = s.trim
  val (sign, rest) = trimmed.headOption match {
    case Some('-') => (-1L, trimmed.tail)
    case Some('+') => (1L, trimmed.tail)
    case _         => (1L, trimmed)
  }
  val digits = rest.takeWhile(_.isDigit)
  val value = digits.foldLeft(0L) { (acc, c) =>
    (acc * 10 + c.asDigit).min(Int.MaxValue.toLong + 1)
  }
  val result = sign * value
  result.max(Int.MinValue.toLong).min(Int.MaxValue.toLong).toInt
}

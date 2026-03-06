/**
 * Problem 113: Basic Calculator (LeetCode 224)
 * Difficulty: Hard
 * Language: Scala
 */
def calculate(s: String): Int = {
  val chars = s.filterNot(_.isWhitespace).toList
  def parse(cs: List[Char]): (Int, List[Char]) = go(cs, 0, 1)
  def go(cs: List[Char], result: Int, sign: Int): (Int, List[Char]) = cs match {
    case Nil => (result, Nil)
    case ')' :: rest => (result, rest)
    case '+' :: rest => go(rest, result, 1)
    case '-' :: rest => go(rest, result, -1)
    case '(' :: rest =>
      val (v, rest2) = parse(rest)
      go(rest2, result + sign * v, 1)
    case _ =>
      val (digits, rest) = cs.span(_.isDigit)
      val num = digits.foldLeft(0)((a, d) => a * 10 + d.asDigit)
      go(rest, result + sign * num, 1)
  }
  parse(chars)._1
}

/**
 * Problem 115: Basic Calculator II (LeetCode 227)
 * Difficulty: Med
 * Language: Scala
 */
def calculate2(s: String): Int = {
  val chars = s.filterNot(_.isWhitespace).toList
  def readNum(cs: List[Char], acc: Int): (Int, List[Char]) = cs match {
    case c :: rest if c.isDigit => readNum(rest, acc * 10 + c.asDigit)
    case _ => (acc, cs)
  }
  def parse(cs: List[Char], stack: List[Int], op: Char): Int = {
    val (num, rest) = readNum(cs, 0)
    val ns = op match {
      case '*' => (stack.head * num) :: stack.tail
      case '/' => (stack.head / num) :: stack.tail
      case '-' => (-num) :: stack
      case _ => num :: stack
    }
    rest match {
      case Nil => ns.sum
      case c :: rest2 => parse(rest2, ns, c)
    }
  }
  parse(chars, Nil, '+')
}

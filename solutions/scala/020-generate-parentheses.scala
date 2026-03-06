/**
 * Problem 20: Generate Parentheses (LeetCode 22)
 * Difficulty: Med
 * Language: Scala
 */
def generateParenthesis(n: Int): List[String] = {
  def gen(open: Int, close: Int, current: String): List[String] = {
    if (current.length == 2 * n) List(current)
    else {
      val left  = if (open < n) gen(open + 1, close, current + "(") else Nil
      val right = if (close < open) gen(open, close + 1, current + ")") else Nil
      left ++ right
    }
  }
  gen(0, 0, "")
}

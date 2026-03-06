/**
 * Problem 18: Valid Parentheses (LeetCode 20)
 * Difficulty: Easy
 * Language: Scala
 */
def isValid(s: String): Boolean = {
  val matching = Map(')' -> '(', ']' -> '[', '}' -> '{')
  s.foldLeft(List.empty[Char]) {
    case (stk, ch) if "({[".contains(ch) => ch :: stk
    case (top :: rest, ch) if matching.get(ch).contains(top) => rest
    case (stk, ch) => ch :: stk  // mismatch
  }.isEmpty
}

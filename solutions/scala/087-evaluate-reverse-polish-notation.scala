/**
 * Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
 * Difficulty: Med
 * Language: Scala
 */
def evalRPN(tokens: List[String]): Int = {
  tokens.foldLeft(List.empty[Int]) {
    case (b :: a :: rest, "+") => (a + b) :: rest
    case (b :: a :: rest, "-") => (a - b) :: rest
    case (b :: a :: rest, "*") => (a * b) :: rest
    case (b :: a :: rest, "/") => (a / b) :: rest
    case (stack, n) => n.toInt :: stack
  }.head
}

/**
 * Problem 91: Min Stack (LeetCode 155)
 * Difficulty: Med
 * Language: Scala
 */
case class MinStack(stack: List[(Int, Int)] = Nil) {
  def push(x: Int): MinStack = {
    val curMin = stack.headOption.map(_._2 min x).getOrElse(x)
    MinStack((x, curMin) :: stack)
  }
  def pop: MinStack = MinStack(stack.tail)
  def top: Int = stack.head._1
  def getMin: Int = stack.head._2
}

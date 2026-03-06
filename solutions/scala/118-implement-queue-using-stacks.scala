/**
 * Problem 118: Implement Queue using Stacks (LeetCode 232)
 * Difficulty: Easy
 * Language: Scala
 */
case class FQueue[A](inStack: List[A] = Nil, outStack: List[A] = Nil) {
  def enqueue(x: A): FQueue[A] = copy(inStack = x :: inStack)
  def transfer: FQueue[A] =
    if (outStack.nonEmpty) this
    else FQueue(Nil, inStack.reverse)
  def dequeue: (A, FQueue[A]) = {
    val t = transfer
    (t.outStack.head, t.copy(outStack = t.outStack.tail))
  }
  def peek: A = transfer.outStack.head
}

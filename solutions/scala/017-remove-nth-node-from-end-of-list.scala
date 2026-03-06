/**
 * Problem 17: Remove Nth Node From End of List (LeetCode 19)
 * Difficulty: Med
 * Language: Scala
 */
def removeNthFromEnd(head: ListNode, n: Int): ListNode = {
  def toList(node: ListNode): List[Int] =
    if (node == null) Nil else node.x :: toList(node.next)

  def fromList(xs: List[Int]): ListNode =
    xs.foldRight(null: ListNode)((v, acc) => { val n = new ListNode(v); n.next = acc; n })

  val items = toList(head)
  val idx = items.length - n
  fromList(items.zipWithIndex.collect { case (v, i) if i != idx => v })
}

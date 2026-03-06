/**
 * Problem 157: Middle of the Linked List (LeetCode 876)
 * Difficulty: Easy
 * Language: Scala
 */
case class ListNode(v: Int, next: Option[ListNode])
def middleNode(head: Option[ListNode]): Option[ListNode] = {
  def collect(n: Option[ListNode]): List[ListNode] = n match {
    case None => Nil
    case Some(node) => node :: collect(node.next)
  }
  val nodes = collect(head)
  Some(nodes(nodes.length / 2))
}

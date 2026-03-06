/**
 * Problem 19: Merge Two Sorted Lists (LeetCode 21)
 * Difficulty: Easy
 * Language: Scala
 */
def mergeTwoLists(l1: ListNode, l2: ListNode): ListNode = {
  (l1, l2) match {
    case (null, _) => l2
    case (_, null) => l1
    case _ if l1.x <= l2.x =>
      val node = new ListNode(l1.x)
      node.next = mergeTwoLists(l1.next, l2)
      node
    case _ =>
      val node = new ListNode(l2.x)
      node.next = mergeTwoLists(l1, l2.next)
      node
  }
}

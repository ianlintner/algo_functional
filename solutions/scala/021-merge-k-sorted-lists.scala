/**
 * Problem 21: Merge k Sorted Lists (LeetCode 23)
 * Difficulty: Hard
 * Language: Scala
 */
def mergeKLists(lists: Array[ListNode]): ListNode = {
  def merge(l1: ListNode, l2: ListNode): ListNode = (l1, l2) match {
    case (null, _) => l2
    case (_, null) => l1
    case _ if l1.x <= l2.x =>
      val n = new ListNode(l1.x); n.next = merge(l1.next, l2); n
    case _ =>
      val n = new ListNode(l2.x); n.next = merge(l1, l2.next); n
  }
  lists.foldLeft(null: ListNode)(merge)
}

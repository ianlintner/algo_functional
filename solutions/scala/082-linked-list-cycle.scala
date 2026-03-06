/**
 * Problem 82: Linked List Cycle (LeetCode 141)
 * Difficulty: Easy
 * Language: Scala
 */
def hasCycle(head: ListNode): Boolean = {
  @annotation.tailrec
  def detect(slow: ListNode, fast: ListNode): Boolean = {
    if (fast == null || fast.next == null) false
    else if (slow eq fast) true
    else detect(slow.next, fast.next.next)
  }
  if (head == null) false else detect(head, head.next)
}

/**
 * Problem 22: Swap Nodes in Pairs (LeetCode 24)
 * Difficulty: Med
 * Language: Scala
 */
def swapPairs(head: ListNode): ListNode = {
  if (head == null || head.next == null) head
  else {
    val second = head.next
    val rest = swapPairs(second.next)
    val newFirst = new ListNode(second.x)
    val newSecond = new ListNode(head.x)
    newFirst.next = newSecond
    newSecond.next = rest
    newFirst
  }
}

/**
 * Problem 2: Add Two Numbers (LeetCode 2)
 * Difficulty: Med
 * Language: Scala
 */
case class ListNode(var _x: Int = 0, var next: ListNode = null) {
  var x: Int = _x
}

def addTwoNumbers(l1: ListNode, l2: ListNode): ListNode = {
  def go(n1: ListNode, n2: ListNode, carry: Int): ListNode = {
    if (n1 == null && n2 == null && carry == 0) null
    else {
      val v1 = if (n1 != null) n1.x else 0
      val v2 = if (n2 != null) n2.x else 0
      val sum = v1 + v2 + carry
      val node = new ListNode(sum % 10)
      node.next = go(
        if (n1 != null) n1.next else null,
        if (n2 != null) n2.next else null,
        sum / 10
      )
      node
    }
  }
  go(l1, l2, 0)
}

/**
 * Problem 145: Odd Even Linked List (LeetCode 328)
 * Difficulty: Med
 * Language: Scala
 */
case class ListNode(v: Int, next: Option[ListNode] = None)
def oddEvenList(head: Option[ListNode]): Option[ListNode] = {
  def collect(node: Option[ListNode], isOdd: Boolean,
              odds: List[Int], evens: List[Int]): (List[Int], List[Int]) = node match {
    case None => (odds.reverse, evens.reverse)
    case Some(n) if isOdd  => collect(n.next, false, n.v :: odds, evens)
    case Some(n)           => collect(n.next, true, odds, n.v :: evens)
  }
  val (odds, evens) = collect(head, isOdd = true, Nil, Nil)
  (odds ++ evens).foldRight(Option.empty[ListNode])((v, acc) => Some(ListNode(v, acc)))
}

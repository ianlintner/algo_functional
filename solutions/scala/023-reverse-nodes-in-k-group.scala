/**
 * Problem 23: Reverse Nodes in k-Group (LeetCode 25)
 * Difficulty: Hard
 * Language: Scala
 */
def reverseKGroup(head: ListNode, k: Int): ListNode = {
  def toList(n: ListNode): List[Int] =
    if (n == null) Nil else n.x :: toList(n.next)
  def fromList(xs: List[Int]): ListNode =
    xs.foldRight(null: ListNode)((v, acc) => { val n = new ListNode(v); n.next = acc; n })

  def process(xs: List[Int]): List[Int] = {
    val (group, rest) = xs.splitAt(k)
    if (group.length < k) xs
    else group.reverse ++ process(rest)
  }

  fromList(process(toList(head)))
}

/**
 * Problem 63: Binary Tree Level Order Traversal (LeetCode 102)
 * Difficulty: Med
 * Language: Scala
 */
def levelOrder[A](root: Tree[A]): List[List[A]] = {
  def bfs(queue: List[Tree[A]]): List[List[A]] = {
    val nodes = queue.collect { case n @ Node(_, _, _) => n }
    if (nodes.isEmpty) Nil
    else {
      val vals = nodes.map(_.v)
      val next = nodes.flatMap(n => List(n.l, n.r).filter(_ != Nil))
      vals :: bfs(next)
    }
  }
  bfs(List(root))
}

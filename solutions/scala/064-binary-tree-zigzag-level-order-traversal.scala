/**
 * Problem 64: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
 * Difficulty: Med
 * Language: Scala
 */
def zigzagLevelOrder[A](root: Tree[A]): List[List[A]] = {
  def bfs(queue: List[Tree[A]], level: Int): List[List[A]] = {
    val nodes = queue.collect { case n @ Node(_,_,_) => n }
    if (nodes.isEmpty) Nil
    else {
      val vals = nodes.map(_.v)
      val row = if (level % 2 == 0) vals else vals.reverse
      val next = nodes.flatMap(n => List(n.l, n.r).filter(_ != Nil))
      row :: bfs(next, level + 1)
    }
  }
  bfs(List(root), 0)
}

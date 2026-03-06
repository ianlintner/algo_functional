/**
 * Problem 99: Binary Tree Right Side View (LeetCode 199)
 * Difficulty: Med
 * Language: Scala
 */
def rightSideView(root: Option[TreeNode]): List[Int] = {
  def bfs(level: List[TreeNode]): List[Int] = level match {
    case Nil => Nil
    case _ =>
      val last = level.last.value
      val next = level.flatMap(n =>
        List(n.left, n.right).flatten
      )
      last :: bfs(next)
  }
  root.map(r => bfs(List(r))).getOrElse(Nil)
}

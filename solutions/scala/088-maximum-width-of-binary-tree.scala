/**
 * Problem 88: Maximum Width of Binary Tree (LeetCode 662)
 * Difficulty: Med
 * Language: Scala
 */
def widthOfBinaryTree(root: Option[TreeNode]): Long = {
  def bfs(level: List[(TreeNode, Long)], maxW: Long): Long = level match {
    case Nil => maxW
    case _ =>
      val w = level.last._2 - level.head._2 + 1
      val next = level.flatMap { case (n, i) =>
        List(n.left.map((_, 2 * i)), n.right.map((_, 2 * i + 1))).flatten
      }
      bfs(next, w max maxW)
  }
  root.map(r => bfs(List((r, 0L)), 0L)).getOrElse(0L)
}

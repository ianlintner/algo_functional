/**
 * Problem 165: Path Sum III (LeetCode 437)
 * Difficulty: Med
 * Language: Scala
 */
case class TreeNode(value: Int, left: Option[TreeNode] = None, right: Option[TreeNode] = None)

def pathSum(root: Option[TreeNode], target: Int): Int = {
  def dfs(node: Option[TreeNode], prefix: Map[Long, Int], curr: Long): Int = node match {
    case None => 0
    case Some(n) =>
      val sum = curr + n.value
      val count = prefix.getOrElse(sum - target, 0)
      val prefix2 = prefix.updated(sum, prefix.getOrElse(sum, 0) + 1)
      count + dfs(n.left, prefix2, sum) + dfs(n.right, prefix2, sum)
  }
  dfs(root, Map(0L -> 1), 0L)
}

/**
 * Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
 * Difficulty: Hard
 * Language: Scala
 */
case class TreeNode(v: Int, left: Option[TreeNode] = None, right: Option[TreeNode] = None)
def serialize(root: Option[TreeNode]): String = root match {
  case None => "null"
  case Some(n) => s"${n.v},${serialize(n.left)},${serialize(n.right)}"
}
def deserialize(data: String): Option[TreeNode] = {
  def build(tokens: List[String]): (Option[TreeNode], List[String]) = tokens match {
    case "null" :: rest => (None, rest)
    case v :: rest =>
      val (left, r1) = build(rest)
      val (right, r2) = build(r1)
      (Some(TreeNode(v.toInt, left, right)), r2)
  }
  build(data.split(",").toList)._1
}

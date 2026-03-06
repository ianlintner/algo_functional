/**
 * Problem 135: Inorder Successor in BST (LeetCode 285)
 * Difficulty: Med
 * Language: Scala
 */
case class TreeNode(val v: Int, left: Option[TreeNode], right: Option[TreeNode])
def inorderSuccessor(root: Option[TreeNode], p: Int): Option[Int] = root match {
  case None => None
  case Some(node) if node.v > p =>
    inorderSuccessor(node.left, p).orElse(Some(node.v))
  case Some(node) => inorderSuccessor(node.right, p)
}

/**
 * Problem 46: Subtree of Another Tree (LeetCode 572)
 * Difficulty: Easy
 * Language: Scala
 */
case class TreeNode(v: Int, left: TreeNode = null, right: TreeNode = null)

def isSubtree(root: TreeNode, sub: TreeNode): Boolean = {
  def same(a: TreeNode, b: TreeNode): Boolean = (a, b) match {
    case (null, null) => true
    case (null, _) | (_, null) => false
    case _ => a.v == b.v && same(a.left, b.left) && same(a.right, b.right)
  }
  if (root == null) sub == null
  else same(root, sub) || isSubtree(root.left, sub) || isSubtree(root.right, sub)
}

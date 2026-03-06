/**
 * Problem 66: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
 * Difficulty: Med
 * Language: Scala
 */
def buildTree[A](preorder: List[A], inorder: List[A]): Tree[A] =
  preorder match {
    case Nil => Nil
    case r :: pre =>
      val (leftIn, _ :: rightIn) = inorder.span(_ != r): @unchecked
      val n = leftIn.length
      Node(r, buildTree(pre.take(n), leftIn),
              buildTree(pre.drop(n), rightIn))
  }

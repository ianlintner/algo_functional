/**
 * Problem 117: Kth Smallest Element in a BST (LeetCode 230)
 * Difficulty: Med
 * Language: Scala
 */
sealed trait Tree[+A]
case object Leaf extends Tree[Nothing]
case class Node[A](left: Tree[A], value: A, right: Tree[A]) extends Tree[A]

def kthSmallest(root: Tree[Int], k: Int): Int = {
  def inorder(t: Tree[Int]): List[Int] = t match {
    case Leaf => Nil
    case Node(l, v, r) => inorder(l) ::: List(v) ::: inorder(r)
  }
  inorder(root)(k - 1)
}

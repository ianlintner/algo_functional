/**
 * Problem 28: Diameter of Binary Tree (LeetCode 543)
 * Difficulty: Easy
 * Language: Scala
 */
sealed trait Tree[+A]
case object Nil extends Tree[Nothing]
case class Node[A](v: A, l: Tree[A], r: Tree[A]) extends Tree[A]

def diameterOfBinaryTree[A](root: Tree[A]): Int = {
  def dfs(node: Tree[A]): (Int, Int) = node match {
    case Nil => (0, 0)
    case Node(_, l, r) =>
      val (lh, ld) = dfs(l)
      val (rh, rd) = dfs(r)
      (1 + (lh max rh), List(lh + rh, ld, rd).max)
  }
  dfs(root)._2
}

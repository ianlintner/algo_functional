/**
 * Problem 60: Validate Binary Search Tree (LeetCode 98)
 * Difficulty: Med
 * Language: Scala
 */
sealed trait Tree[+A]
case object Nil extends Tree[Nothing]
case class Node[A](v: A, l: Tree[A], r: Tree[A]) extends Tree[A]

def isValidBST(t: Tree[Int], lo: Long = Long.MinValue, hi: Long = Long.MaxValue): Boolean =
  t match {
    case Nil => true
    case Node(v, l, r) =>
      v > lo && v < hi &&
      isValidBST(l, lo, v) &&
      isValidBST(r, v, hi)
  }

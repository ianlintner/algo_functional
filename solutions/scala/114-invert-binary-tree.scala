/**
 * Problem 114: Invert Binary Tree (LeetCode 226)
 * Difficulty: Easy
 * Language: Scala
 */
sealed trait BTree[+A]
case object Empty extends BTree[Nothing]
case class Node[A](v: A, l: BTree[A], r: BTree[A]) extends BTree[A]

def invertTree[A](root: BTree[A]): BTree[A] = root match {
  case Empty => Empty
  case Node(v, l, r) => Node(v, invertTree(r), invertTree(l))
}

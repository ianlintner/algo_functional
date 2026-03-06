/**
 * Problem 65: Maximum Depth of Binary Tree (LeetCode 104)
 * Difficulty: Easy
 * Language: Scala
 */
def maxDepth[A](t: Tree[A]): Int = t match {
  case Nil => 0
  case Node(_, l, r) => 1 + (maxDepth(l) max maxDepth(r))
}

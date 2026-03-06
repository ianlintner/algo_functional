/**
 * Problem 61: Same Tree (LeetCode 100)
 * Difficulty: Easy
 * Language: Scala
 */
def isSameTree[A](p: Tree[A], q: Tree[A]): Boolean = (p, q) match {
  case (Nil, Nil) => true
  case (Node(v1, l1, r1), Node(v2, l2, r2)) =>
    v1 == v2 && isSameTree(l1, l2) && isSameTree(r1, r2)
  case _ => false
}

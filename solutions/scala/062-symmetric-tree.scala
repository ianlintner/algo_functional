/**
 * Problem 62: Symmetric Tree (LeetCode 101)
 * Difficulty: Easy
 * Language: Scala
 */
def isSymmetric[A](t: Tree[A]): Boolean = {
  def mirror(a: Tree[A], b: Tree[A]): Boolean = (a, b) match {
    case (Nil, Nil) => true
    case (Node(v1,l1,r1), Node(v2,l2,r2)) =>
      v1 == v2 && mirror(l1, r2) && mirror(r1, l2)
    case _ => false
  }
  t match { case Nil => true; case Node(_,l,r) => mirror(l, r) }
}

/**
 * Problem 69: Balanced Binary Tree (LeetCode 110)
 * Difficulty: Easy
 * Language: Scala
 */
def isBalanced[A](t: Tree[A]): Boolean = {
  def height(t: Tree[A]): Int = t match {
    case Nil => 0
    case Node(_, l, r) =>
      val (lh, rh) = (height(l), height(r))
      if (lh == -1 || rh == -1 || (lh - rh).abs > 1) -1
      else 1 + (lh max rh)
  }
  height(t) != -1
}

/**
 * Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
 * Difficulty: Hard
 * Language: Scala
 */
def maxPathSum(t: Tree[Int]): Int = {
  def go(node: Tree[Int]): (Int, Int) = node match {
    case Nil => (0, Int.MinValue)
    case Node(v, l, r) =>
      val (lg, lm) = go(l); val (rg, rm) = go(r)
      val gain = 0.max(v + lg.max(rg))
      val pathMax = List(lm, rm, v + lg + rg).max
      (gain, pathMax)
  }
  go(t)._2
}

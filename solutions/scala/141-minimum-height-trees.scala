/**
 * Problem 141: Minimum Height Trees (LeetCode 310)
 * Difficulty: Med
 * Language: Scala
 */
def findMinHeightTrees(n: Int, edges: Array[Array[Int]]): List[Int] = {
  if (n == 1) return List(0)
  var adj = edges.foldLeft(Map.empty[Int, Set[Int]]) { case (g, Array(u, v)) =>
    g.updated(u, g.getOrElse(u, Set()) + v).updated(v, g.getOrElse(v, Set()) + u)
  }
  def trim(leaves: List[Int], rem: Int): List[Int] = {
    if (rem <= 2) leaves
    else {
      val (newLeaves, newAdj) = leaves.foldLeft((List.empty[Int], adj)) { case ((nl, g), leaf) =>
        val nbs = g(leaf)
        val g2 = nbs.foldLeft(g)((ga, nb) => ga.updated(nb, ga(nb) - leaf))
        val nl2 = nbs.filter(nb => g2(nb).size == 1).toList
        (nl ++ nl2, g2)
      }
      adj = newAdj
      trim(newLeaves, rem - leaves.length)
    }
  }
  trim(adj.filter(_._2.size == 1).keys.toList, n)
}

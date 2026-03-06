/**
 * Problem 128: Graph Valid Tree (LeetCode 261)
 * Difficulty: Med
 * Language: Scala
 */
def validTree(n: Int, edges: List[(Int, Int)]): Boolean = {
  if (edges.length != n - 1) false
  else {
    val adj = edges.foldLeft(Map.empty[Int, List[Int]]) { case (g, (u, v)) =>
      g.updated(u, v :: g.getOrElse(u, Nil))
       .updated(v, u :: g.getOrElse(v, Nil))
    }
    def dfs(node: Int, visited: Set[Int]): Set[Int] =
      if (visited.contains(node)) visited
      else adj.getOrElse(node, Nil).foldLeft(visited + node)(
        (v, nb) => dfs(nb, v))
    dfs(0, Set.empty).size == n
  }
}

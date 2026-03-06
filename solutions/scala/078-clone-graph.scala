/**
 * Problem 78: Clone Graph (LeetCode 133)
 * Difficulty: Med
 * Language: Scala
 */
case class GNode(val v: Int, var neighbors: List[GNode])
def cloneGraph(node: GNode, visited: Map[Int, GNode] = Map.empty): (GNode, Map[Int, GNode]) = {
  visited.get(node.v) match {
    case Some(c) => (c, visited)
    case None =>
      val clone = GNode(node.v, Nil)
      val vis = visited + (node.v -> clone)
      val (nbrs, vis2) = node.neighbors.foldLeft((List.empty[GNode], vis)) {
        case ((acc, v), nb) =>
          val (cn, v2) = cloneGraph(nb, v)
          (acc :+ cn, v2)
      }
      clone.neighbors = nbrs
      (clone, vis2)
  }
}

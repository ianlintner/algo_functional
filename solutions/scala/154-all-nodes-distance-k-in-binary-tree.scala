/**
 * Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
 * Difficulty: Med
 * Language: Scala
 */
def distanceK(adj: Map[Int, List[Int]], target: Int, k: Int): List[Int] = {
  def bfs(queue: List[(Int, Int)], visited: Set[Int]): List[Int] = queue match {
    case Nil => Nil
    case (node, dist) :: rest if dist == k =>
      node :: bfs(rest, visited)
    case (node, dist) :: rest =>
      val neighbors = adj.getOrElse(node, Nil).filterNot(visited.contains)
      bfs(rest ++ neighbors.map((_, dist + 1)), visited ++ neighbors)
  }
  bfs(List((target, 0)), Set(target))
}

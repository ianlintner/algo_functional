/**
 * Problem 142: Bus Routes (LeetCode 815)
 * Difficulty: Hard
 * Language: Scala
 */
def numBusesToDestination(routes: Array[Array[Int]], source: Int, target: Int): Int = {
  if (source == target) return 0
  val stopToRoutes = routes.zipWithIndex.foldLeft(Map.empty[Int, List[Int]]) {
    case (m, (stops, ri)) => stops.foldLeft(m) { (m2, s) =>
      m2.updated(s, ri :: m2.getOrElse(s, Nil))
    }
  }
  def bfs(queue: List[Int], buses: Int, visited: Set[Int], vr: Set[Int]): Int = queue match {
    case Nil => -1
    case _ if queue.contains(target) => buses
    case _ =>
      val (nextQ, vis2, vr2) = queue.foldLeft((List.empty[Int], visited, vr)) {
        case ((nq, v, r), stop) =>
          val ris = stopToRoutes.getOrElse(stop, Nil).filterNot(r.contains)
          val r2 = ris.foldLeft(r)(_ + _)
          val newStops = ris.flatMap(ri => routes(ri).toList).filterNot(v.contains)
          val v2 = newStops.foldLeft(v)(_ + _)
          (nq ++ newStops, v2, r2)
      }
      bfs(nextQ, buses + 1, vis2, vr2)
  }
  bfs(List(source), 0, Set(source), Set.empty)
}

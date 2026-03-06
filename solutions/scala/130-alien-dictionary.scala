/**
 * Problem 130: Alien Dictionary (LeetCode 269)
 * Difficulty: Hard
 * Language: Scala
 */
def alienOrder(words: Array[String]): String = {
  val chars = words.flatMap(_.toList).toSet
  val edges = words.sliding(2).flatMap { case Array(w1, w2) =>
    w1.zip(w2).find { case (a, b) => a != b }.map { case (a, b) => (a, b) }
  }.toList
  val graph = edges.foldLeft(chars.map(_ -> Set.empty[Char]).toMap) {
    case (g, (u, v)) => g.updated(u, g(u) + v)
  }
  val inDeg = edges.foldLeft(chars.map(_ -> 0).toMap) {
    case (m, (_, v)) => m.updated(v, m(v) + 1)
  }
  def topo(queue: List[Char], res: String, deg: Map[Char, Int]): String =
    queue match {
      case Nil => if (res.length == chars.size) res else ""
      case c :: rest =>
        val nbs = graph.getOrElse(c, Set.empty)
        val (newDeg, newQ) = nbs.foldLeft((deg, rest)) {
          case ((d, q), n) =>
            val d2 = d.updated(n, d(n) - 1)
            if (d2(n) == 0) (d2, q :+ n) else (d2, q)
        }
        topo(newQ, res + c, newDeg)
    }
  topo(inDeg.filter(_._2 == 0).keys.toList, "", inDeg)
}

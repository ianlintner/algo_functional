/**
 * Problem 105: Course Schedule II (LeetCode 210)
 * Difficulty: Med
 * Language: Scala
 */
def findOrder(n: Int, prereqs: Array[Array[Int]]): Array[Int] = {
  val graph = prereqs.foldLeft(Map.empty[Int, List[Int]]) {
    case (g, Array(a, b)) => g + (b -> (a :: g.getOrElse(b, Nil)))
  }
  case class S(path: Set[Int], done: Set[Int], order: List[Int], cycle: Boolean)
  def dfs(v: Int, s: S): S =
    if (s.cycle || s.done(v)) s
    else if (s.path(v)) s.copy(cycle = true)
    else {
      val s2 = graph.getOrElse(v, Nil).foldLeft(s.copy(path = s.path + v))(
        (st, nb) => dfs(nb, st))
      s2.copy(done = s2.done + v, order = s2.order :+ v)
    }
  val result = (0 until n).foldLeft(S(Set(), Set(), Nil, false))((s, i) => dfs(i, s))
  if (result.cycle) Array() else result.order.toArray
}

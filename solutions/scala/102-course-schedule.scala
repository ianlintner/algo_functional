/**
 * Problem 102: Course Schedule (LeetCode 207)
 * Difficulty: Med
 * Language: Scala
 */
def canFinish(n: Int, prereqs: Array[Array[Int]]): Boolean = {
  val graph = prereqs.foldLeft(Map.empty[Int, List[Int]]) {
    case (g, Array(a, b)) => g + (b -> (a :: g.getOrElse(b, Nil)))
  }
  type S = (Set[Int], Set[Int])
  def dfs(v: Int, s: S): (Boolean, S) =
    if (s._2(v)) (false, s) else if (s._1(v)) (true, s)
    else {
      val (cyc, (p, d)) = graph.getOrElse(v, Nil).foldLeft((false, (s._1 + v, s._2))) {
        case ((true, st), _) => (true, st)
        case ((false, st), nb) => dfs(nb, st)
      }
      (cyc, (p, d + v))
    }
  !(0 until n).foldLeft((false, (Set.empty[Int], Set.empty[Int]): S)) {
    case ((true, s), _) => (true, s)
    case ((false, s), i) => dfs(i, s)
  }._1
}

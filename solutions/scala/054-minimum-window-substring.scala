/**
 * Problem 54: Minimum Window Substring (LeetCode 76)
 * Difficulty: Hard
 * Language: Scala
 */
def minWindow(s: String, t: String): String = {
  val need = t.groupBy(identity).view.mapValues(_.length).toMap
  val keys = need.size
  case class State(l: Int, have: Int, win: Map[Char,Int], best: (Int,Int))
  val init = State(0, 0, Map.empty, (0, Int.MaxValue))
  val res = s.indices.foldLeft(init) { case (State(l, have, win, best), r) =>
    val c = s(r)
    val w = win + (c -> (win.getOrElse(c, 0) + 1))
    val h = if (w(c) == need.getOrElse(c, 0)) have + 1 else have
    def shrink(l: Int, h: Int, w: Map[Char,Int], b: (Int,Int)): State = {
      if (h < keys) State(l, h, w, b)
      else {
        val nb = if (r - l + 1 < b._2 - b._1) (l, r + 1) else b
        val lc = s(l)
        val nw = w + (lc -> (w(lc) - 1))
        val nh = if (nw(lc) < need.getOrElse(lc, 0)) h - 1 else h
        shrink(l + 1, nh, nw, nb)
      }
    }
    shrink(l, h, w, best)
  }
  if (res.best._2 == Int.MaxValue) "" else s.substring(res.best._1, res.best._2)
}

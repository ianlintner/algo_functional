/**
 * Problem 76: Word Ladder (LeetCode 127)
 * Difficulty: Hard
 * Language: Scala
 */
def ladderLength(begin: String, end: String, wordList: List[String]): Int = {
  val dict = wordList.toSet
  if (!dict.contains(end)) return 0
  def neighbors(w: String) = for {
    i <- w.indices; c <- 'a' to 'z' if c != w(i)
    nw = w.updated(i, c) if dict.contains(nw)
  } yield nw
  @annotation.tailrec
  def bfs(queue: List[(String,Int)], visited: Set[String]): Int = queue match {
    case Nil => 0
    case (w, d) :: rest if w == end => d
    case (w, d) :: rest =>
      val ns = neighbors(w).filterNot(visited.contains)
      bfs(rest ++ ns.map((_, d+1)), visited ++ ns)
  }
  bfs(List((begin, 1)), Set(begin))
}

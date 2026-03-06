/**
 * Problem 107: Word Search II (LeetCode 212)
 * Difficulty: Hard
 * Language: Scala
 */
case class TrieN(ch: Map[Char, TrieN] = Map(), word: Option[String] = None) {
  def insert(w: String, i: Int = 0): TrieN =
    if (i == w.length) copy(word = Some(w))
    else copy(ch = ch + (w(i) -> ch.getOrElse(w(i), TrieN()).insert(w, i + 1)))
}
def findWords(board: Array[Array[Char]], words: Array[String]): List[String] = {
  val trie = words.foldLeft(TrieN())((t, w) => t.insert(w))
  val (rows, cols) = (board.length, board(0).length)
  def dfs(r: Int, c: Int, node: TrieN,
          seen: Set[(Int,Int)], found: Set[String]): Set[String] = {
    if (r < 0 || r >= rows || c < 0 || c >= cols || seen((r,c))) found
    else node.ch.get(board(r)(c)) match {
      case None => found
      case Some(next) =>
        val f = next.word.fold(found)(found + _)
        List((-1,0),(1,0),(0,-1),(0,1)).foldLeft(f) {
          case (acc, (dr,dc)) => dfs(r+dr, c+dc, next, seen + ((r,c)), acc)
        }
    }
  }
  (for (r <- 0 until rows; c <- 0 until cols) yield (r,c))
    .foldLeft(Set.empty[String])((f, rc) =>
      dfs(rc._1, rc._2, trie, Set(), f)).toList
}

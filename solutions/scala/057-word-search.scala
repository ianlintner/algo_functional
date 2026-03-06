/**
 * Problem 57: Word Search (LeetCode 79)
 * Difficulty: Med
 * Language: Scala
 */
def exist(board: Array[Array[Char]], word: String): Boolean = {
  val (rows, cols) = (board.length, board(0).length)
  def dfs(r: Int, c: Int, i: Int, vis: Set[(Int,Int)]): Boolean =
    if (i == word.length) true
    else if (r < 0 || r >= rows || c < 0 || c >= cols) false
    else if (vis((r,c)) || board(r)(c) != word(i)) false
    else {
      val v = vis + ((r,c))
      List((1,0),(-1,0),(0,1),(0,-1)).exists { case (dr,dc) =>
        dfs(r+dr, c+dc, i+1, v)
      }
    }
  (for (r <- 0 until rows; c <- 0 until cols) yield (r,c))
    .exists { case (r,c) => dfs(r, c, 0, Set.empty) }
}

/**
 * Problem 146: Longest Increasing Path in a Matrix (LeetCode 329)
 * Difficulty: Hard
 * Language: Scala
 */
def longestIncreasingPath(matrix: Array[Array[Int]]): Int = {
  val (rows, cols) = (matrix.length, matrix(0).length)
  val memo = scala.collection.mutable.Map[(Int,Int), Int]()
  def dfs(r: Int, c: Int): Int = memo.getOrElseUpdate((r,c), {
    val dirs = List((0,1),(0,-1),(1,0),(-1,0))
    1 + dirs.foldLeft(0) { case (mx, (dr,dc)) =>
      val (nr, nc) = (r+dr, c+dc)
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix(nr)(nc) > matrix(r)(c))
        mx.max(dfs(nr, nc))
      else mx
    }
  })
  (for (r <- 0 until rows; c <- 0 until cols) yield dfs(r,c)).max
}

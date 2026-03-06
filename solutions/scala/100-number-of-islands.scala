/**
 * Problem 100: Number of Islands (LeetCode 200)
 * Difficulty: Med
 * Language: Scala
 */
def numIslands(grid: Array[Array[Char]]): Int = {
  val (rows, cols) = (grid.length, grid(0).length)
  def flood(r: Int, c: Int, vis: Set[(Int,Int)]): Set[(Int,Int)] = {
    if (r < 0 || r >= rows || c < 0 || c >= cols) vis
    else if (grid(r)(c) != '1' || vis.contains((r, c))) vis
    else List((r-1,c),(r+1,c),(r,c-1),(r,c+1))
      .foldLeft(vis + ((r, c))) { case (v, (nr, nc)) => flood(nr, nc, v) }
  }
  val coords = for (r <- 0 until rows; c <- 0 until cols) yield (r, c)
  coords.foldLeft((0, Set.empty[(Int,Int)])) { case ((cnt, vis), (r, c)) =>
    if (grid(r)(c) != '1' || vis.contains((r, c))) (cnt, vis)
    else (cnt + 1, flood(r, c, vis))
  }._1
}

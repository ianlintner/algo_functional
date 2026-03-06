/**
 * Problem 161: Pacific Atlantic Water Flow (LeetCode 417)
 * Difficulty: Med
 * Language: Scala
 */
def pacificAtlantic(heights: Array[Array[Int]]): List[(Int, Int)] = {
  val (rows, cols) = (heights.length, heights(0).length)
  def dfs(visited: Set[(Int,Int)], r: Int, c: Int): Set[(Int,Int)] = {
    if (visited.contains((r, c))) visited
    else List((1,0),(-1,0),(0,1),(0,-1)).foldLeft(visited + ((r, c))) {
      case (v, (dr, dc)) =>
        val (nr, nc) = (r + dr, c + dc)
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
            !v.contains((nr, nc)) && heights(nr)(nc) >= heights(r)(c))
          dfs(v, nr, nc) else v
    }
  }
  val pacStarts = (0 until rows).map((_, 0)) ++ (0 until cols).map((0, _))
  val atlStarts = (0 until rows).map((_, cols-1)) ++ (0 until cols).map((rows-1, _))
  val pac = pacStarts.foldLeft(Set.empty[(Int,Int)])((v, p) => dfs(v, p._1, p._2))
  val atl = atlStarts.foldLeft(Set.empty[(Int,Int)])((v, p) => dfs(v, p._1, p._2))
  pac.intersect(atl).toList
}

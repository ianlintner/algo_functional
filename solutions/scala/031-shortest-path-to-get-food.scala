/**
 * Problem 31: Shortest Path to Get Food (LeetCode 1730)
 * Difficulty: Med
 * Language: Scala
 */
def getFood(grid: Array[Array[Char]]): Int = {
  val (rows, cols) = (grid.length, grid(0).length)
  val start = (for (i <- 0 until rows; j <- 0 until cols if grid(i)(j) == '*') yield (i, j)).head
  val dirs = List((0,1),(0,-1),(1,0),(-1,0))

  @annotation.tailrec
  def bfs(queue: List[(Int,Int,Int)], visited: Set[(Int,Int)]): Int = queue match {
    case Nil => -1
    case _ =>
      val (next, vis2, found) = queue.foldLeft((List.empty[(Int,Int,Int)], visited, Option.empty[Int])) {
        case ((nx, vis, Some(d)), _) => (nx, vis, Some(d))
        case ((nx, vis, None), (r, c, d)) =>
          dirs.foldLeft((nx, vis, Option.empty[Int])) {
            case ((nx, vis, Some(d)), _) => (nx, vis, Some(d))
            case ((nx, vis, None), (dr, dc)) =>
              val (nr, nc) = (r + dr, c + dc)
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                  grid(nr)(nc) != 'X' && !vis.contains((nr, nc))) {
                if (grid(nr)(nc) == '#') (nx, vis, Some(d + 1))
                else ((nr, nc, d + 1) :: nx, vis + ((nr, nc)), None)
              } else (nx, vis, None)
          }
      }
      found match {
        case Some(d) => d
        case None => bfs(next.reverse, vis2)
      }
  }
  bfs(List((start._1, start._2, 0)), Set(start))
}

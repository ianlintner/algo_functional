/**
 * Problem 10: Rotting Oranges (LeetCode 994)
 * Difficulty: Med
 * Language: Scala
 */
def orangesRotting(grid: Array[Array[Int]]): Int = {
  val rows = grid.length; val cols = grid(0).length
  val indexed = for (r <- 0 until rows; c <- 0 until cols) yield ((r, c), grid(r)(c))
  val rotten = indexed.collect { case ((r, c), 2) => (r, c) }.toList
  val fresh  = indexed.collect { case ((r, c), 1) => (r, c) }.toSet

  @annotation.tailrec
  def bfs(queue: List[(Int, Int)], fr: Set[(Int, Int)], time: Int): Int = {
    if (fr.isEmpty) time
    else if (queue.isEmpty) -1
    else {
      val (nextQ, nextFr) = queue.foldLeft((List.empty[(Int,Int)], fr)) {
        case ((nq, f), (r, c)) =>
          List((r-1,c),(r+1,c),(r,c-1),(r,c+1))
            .filter { case (nr,nc) => nr>=0 && nr<rows && nc>=0 && nc<cols && f.contains((nr,nc)) }
            .foldLeft((nq, f)) { case ((nq2, f2), pos) => (pos :: nq2, f2 - pos) }
      }
      if (nextQ.isEmpty) (if (nextFr.isEmpty) time else -1)
      else bfs(nextQ, nextFr, time + 1)
    }
  }
  bfs(rotten, fresh, 0)
}

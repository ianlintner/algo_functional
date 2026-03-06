/**
 * Problem 71: Minimum Knight Moves (LeetCode 1197)
 * Difficulty: Med
 * Language: Scala
 */
import scala.collection.immutable.Queue
def minKnightMoves(x: Int, y: Int): Int = {
  val (tx, ty) = (x.abs, y.abs)
  val moves = List((1,2),(2,1),(2,-1),(1,-2),(-1,-2),(-2,-1),(-2,1),(-1,2))
  @annotation.tailrec
  def bfs(queue: Queue[(Int,Int,Int)], visited: Set[(Int,Int)]): Int = {
    val ((cx,cy,d), rest) = queue.dequeue
    if (cx == tx && cy == ty) d
    else {
      val nexts = moves.map{case(dx,dy)=>(cx+dx,cy+dy,d+1)}
        .filter{case(nx,ny,_)=> nx >= -2 && ny >= -2 && !visited.contains((nx,ny))}
      bfs(rest.enqueueAll(nexts), visited ++ nexts.map{case(a,b,_)=>(a,b)})
    }
  }
  bfs(Queue((0,0,0)), Set((0,0)))
}

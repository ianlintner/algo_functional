/**
 * Problem 110: Maximal Square (LeetCode 221)
 * Difficulty: Med
 * Language: Scala
 */
def maximalSquare(matrix: Array[Array[Char]]): Int = {
  val cols = matrix(0).length
  val (mx, _) = matrix.zipWithIndex.foldLeft((0, Array.fill(cols)(0))) {
    case ((best, prev), (row, r)) =>
      val curr = row.zipWithIndex.foldLeft(Array.empty[Int]) {
        case (acc, (cell, c)) =>
          val v = if (cell == '0') 0
            else if (r == 0 || c == 0) 1
            else Seq(prev(c-1), prev(c), acc.lastOption.getOrElse(0)).min + 1
          acc :+ v
      }
      (best max curr.max, curr)
  }
  mx * mx
}

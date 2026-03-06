/**
 * Problem 29: Valid Sudoku (LeetCode 36)
 * Difficulty: Med
 * Language: Scala
 */
def isValidSudoku(board: Array[Array[Char]]): Boolean = {
  val entries = for {
    (row, i) <- board.zipWithIndex
    (c, j)   <- row.zipWithIndex
    if c != '.'
  } yield (i, j, c)
  val keys = entries.flatMap { case (i, j, c) =>
    Seq(s"r$i:$c", s"c$j:$c", s"b${i/3},${j/3}:$c")
  }
  keys.length == keys.toSet.size
}

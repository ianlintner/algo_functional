/**
 * Problem 30: Sudoku Solver (LeetCode 37)
 * Difficulty: Hard
 * Language: Scala
 */
def solveSudoku(board: Array[Array[Char]]): Unit = {
  def isValid(r: Int, c: Int, d: Char): Boolean = {
    val br = (r / 3) * 3; val bc = (c / 3) * 3
    (0 until 9).forall(i => board(r)(i) != d) &&
    (0 until 9).forall(i => board(i)(c) != d) &&
    (0 until 3).forall(i => (0 until 3).forall(j => board(br+i)(bc+j) != d))
  }

  def solve(): Boolean = {
    (for (i <- 0 until 9; j <- 0 until 9 if board(i)(j) == '.') yield (i, j))
      .headOption match {
        case None => true
        case Some((r, c)) =>
          ('1' to '9').exists { d =>
            if (isValid(r, c, d)) {
              board(r)(c) = d
              if (solve()) true else { board(r)(c) = '.'; false }
            } else false
          }
      }
  }
  solve()
}

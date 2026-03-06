/**
 * Problem 39: N-Queens (LeetCode 51)
 * Difficulty: Hard
 * Language: Scala
 */
def solveNQueens(n: Int): List[List[String]] = {
  def go(row: Int, cols: Set[Int], d1: Set[Int], d2: Set[Int],
         board: List[Int]): List[List[String]] = {
    if (row == n) List(board.reverse.map(c =>
      "." * c + "Q" + "." * (n - c - 1)))
    else (0 until n).toList
      .filter(c => !cols(c) && !d1(row - c) && !d2(row + c))
      .flatMap(c =>
        go(row + 1, cols + c, d1 + (row - c), d2 + (row + c), c :: board))
  }
  go(0, Set(), Set(), Set(), Nil)
}

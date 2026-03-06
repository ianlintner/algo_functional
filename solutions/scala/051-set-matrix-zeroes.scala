/**
 * Problem 51: Set Matrix Zeroes (LeetCode 73)
 * Difficulty: Med
 * Language: Scala
 */
def setZeroes(matrix: Array[Array[Int]]): Array[Array[Int]] = {
  val zeroRows = matrix.indices.filter(i => matrix(i).contains(0)).toSet
  val zeroCols = matrix(0).indices.filter(j => matrix.exists(_(j) == 0)).toSet
  matrix.zipWithIndex.map { case (row, i) =>
    row.zipWithIndex.map { case (v, j) =>
      if (zeroRows(i) || zeroCols(j)) 0 else v
    }
  }
}

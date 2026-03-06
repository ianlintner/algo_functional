/**
 * Problem 36: Rotate Image (LeetCode 48)
 * Difficulty: Med
 * Language: Scala
 */
def rotate(matrix: Array[Array[Int]]): Array[Array[Int]] =
  matrix.transpose.map(_.reverse)

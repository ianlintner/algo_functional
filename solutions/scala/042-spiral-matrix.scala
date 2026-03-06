/**
 * Problem 42: Spiral Matrix (LeetCode 54)
 * Difficulty: Med
 * Language: Scala
 */
def spiralOrder(matrix: Array[Array[Int]]): List[Int] = {
  def rotate(m: List[List[Int]]): List[List[Int]] =
    m.transpose.map(_.reverse)
  def go(m: List[List[Int]]): List[Int] = m match {
    case Nil => Nil
    case top :: rest => top ++ go(rotate(rest))
  }
  go(matrix.map(_.toList).toList)
}

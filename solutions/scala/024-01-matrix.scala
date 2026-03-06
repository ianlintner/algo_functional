/**
 * Problem 24: 01 Matrix (LeetCode 542)
 * Difficulty: Med
 * Language: Scala
 */
def updateMatrix(mat: Array[Array[Int]]): Array[Array[Int]] = {
  val rows = mat.length; val cols = mat(0).length
  val inf = rows + cols
  val dist = mat.map(_.map(v => if (v == 0) 0 else inf))

  for (r <- 0 until rows; c <- 0 until cols) {
    if (r > 0) dist(r)(c) = math.min(dist(r)(c), dist(r-1)(c) + 1)
    if (c > 0) dist(r)(c) = math.min(dist(r)(c), dist(r)(c-1) + 1)
  }
  for (r <- (0 until rows).reverse; c <- (0 until cols).reverse) {
    if (r < rows - 1) dist(r)(c) = math.min(dist(r)(c), dist(r+1)(c) + 1)
    if (c < cols - 1) dist(r)(c) = math.min(dist(r)(c), dist(r)(c+1) + 1)
  }
  dist
}

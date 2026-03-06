/**
 * Problem 49: Add Binary (LeetCode 67)
 * Difficulty: Easy
 * Language: Scala
 */
def addBinary(a: String, b: String): String = {
  def go(i: Int, j: Int, carry: Int, acc: String): String = {
    if (i < 0 && j < 0 && carry == 0) acc
    else {
      val da = if (i >= 0) a(i) - '0' else 0
      val db = if (j >= 0) b(j) - '0' else 0
      val s = da + db + carry
      go(i - 1, j - 1, s / 2, (s % 2).toString + acc)
    }
  }
  go(a.length - 1, b.length - 1, 0, "")
}

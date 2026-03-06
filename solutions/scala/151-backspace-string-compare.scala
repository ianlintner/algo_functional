/**
 * Problem 151: Backspace String Compare (LeetCode 844)
 * Difficulty: Easy
 * Language: Scala
 */
def backspaceCompare(s: String, t: String): Boolean = {
  def build(str: String): String =
    str.foldLeft("") { (acc, ch) =>
      if (ch == '#') acc.dropRight(1) else acc + ch
    }
  build(s) == build(t)
}

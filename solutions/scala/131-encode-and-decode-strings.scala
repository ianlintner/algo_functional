/**
 * Problem 131: Encode and Decode Strings (LeetCode 271)
 * Difficulty: Med
 * Language: Scala
 */
def encode(strs: List[String]): String =
  strs.foldLeft("")((acc, s) => acc + s.length + "#" + s)

def decode(s: String): List[String] = {
  def helper(i: Int, acc: List[String]): List[String] = {
    if (i >= s.length) acc.reverse
    else {
      val hash = s.indexOf('#', i)
      val len = s.substring(i, hash).toInt
      val word = s.substring(hash + 1, hash + 1 + len)
      helper(hash + 1 + len, word :: acc)
    }
  }
  helper(0, Nil)
}

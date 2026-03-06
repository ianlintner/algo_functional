/**
 * Problem 156: Decode String (LeetCode 394)
 * Difficulty: Med
 * Language: Scala
 */
def decodeString(s: String): String = {
  def helper(i: Int): (String, Int) = {
    val sb = new StringBuilder; var idx = i
    while (idx < s.length && s(idx) != ']') {
      if (s(idx).isDigit) {
        var num = 0
        while (s(idx).isDigit) { num = num * 10 + (s(idx) - '0'); idx += 1 }
        idx += 1 // skip '['
        val (decoded, ni) = helper(idx)
        sb.append(decoded * num); idx = ni + 1
      } else { sb.append(s(idx)); idx += 1 }
    }
    (sb.toString, idx)
  }
  helper(0)._1
}

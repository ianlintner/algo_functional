/**
 * Problem 12: Longest Common Prefix (LeetCode 14)
 * Difficulty: Easy
 * Language: Scala
 */
def longestCommonPrefix(strs: Array[String]): String = {
  if (strs.isEmpty) ""
  else strs.reduce { (prefix, s) =>
    prefix.zip(s).takeWhile { case (a, b) => a == b }.map(_._1).mkString
  }
}

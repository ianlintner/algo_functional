/**
 * Problem 81: Word Break (LeetCode 139)
 * Difficulty: Med
 * Language: Scala
 */
def wordBreak(s: String, wordDict: List[String]): Boolean = {
  val dict = wordDict.toSet
  val n = s.length
  val dp = (1 to n).foldLeft(Vector(true) ++ Vector.fill(n)(false)) { (dp, i) =>
    dp.updated(i, (0 until i).exists(j => dp(j) && dict.contains(s.substring(j, i))))
  }
  dp(n)
}

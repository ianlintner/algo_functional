/**
 * Problem 37: Group Anagrams (LeetCode 49)
 * Difficulty: Med
 * Language: Scala
 */
def groupAnagrams(strs: Array[String]): List[List[String]] =
  strs.groupBy(_.sorted).values.map(_.toList).toList

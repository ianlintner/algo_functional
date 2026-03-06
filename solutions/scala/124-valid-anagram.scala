/**
 * Problem 124: Valid Anagram (LeetCode 242)
 * Difficulty: Easy
 * Language: Scala
 */
def isAnagram(s: String, t: String): Boolean =
  s.sorted == t.sorted

/**
 * Problem 75: Valid Palindrome (LeetCode 125)
 * Difficulty: Easy
 * Language: Scala
 */
def isPalindrome(s: String): Boolean = {
  val cleaned = s.toLowerCase.filter(_.isLetterOrDigit)
  cleaned == cleaned.reverse
}

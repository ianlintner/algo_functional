/**
 * Problem 8: Palindrome Number (LeetCode 9)
 * Difficulty: Easy
 * Language: Scala
 */
def isPalindrome(x: Int): Boolean = {
  if (x < 0) false
  else {
    val s = x.toString
    s == s.reverse
  }
}

/**
 * Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
 * Difficulty: Med
 * Language: Scala
 */
def letterCombinations(digits: String): List[String] = {
  if (digits.isEmpty) return Nil
  val phone = Map('2' -> "abc", '3' -> "def", '4' -> "ghi", '5' -> "jkl",
                  '6' -> "mno", '7' -> "pqrs", '8' -> "tuv", '9' -> "wxyz")
  digits.foldLeft(List("")) { (combos, d) =>
    for (combo <- combos; ch <- phone(d)) yield combo + ch
  }
}

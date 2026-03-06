/**
 * Problem 149: Counting Bits (LeetCode 338)
 * Difficulty: Easy
 * Language: Scala
 */
def countBits(n: Int): Array[Int] =
  (0 to n).foldLeft(Array.empty[Int]) { (dp, i) =>
    dp :+ (if (i == 0) 0 else dp(i >> 1) + (i & 1))
  }

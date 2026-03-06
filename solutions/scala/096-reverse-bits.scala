/**
 * Problem 96: Reverse Bits (LeetCode 190)
 * Difficulty: Easy
 * Language: Scala
 */
def reverseBits(n: Int): Int =
  (0 until 32).foldLeft(0) { (acc, i) =>
    acc | (((n >>> i) & 1) << (31 - i))
  }

/**
 * Problem 97: Number of 1 Bits (LeetCode 191)
 * Difficulty: Easy
 * Language: Scala
 */
@annotation.tailrec
def hammingWeight(n: Int, acc: Int = 0): Int =
  if (n == 0) acc else hammingWeight(n >>> 1, acc + (n & 1))

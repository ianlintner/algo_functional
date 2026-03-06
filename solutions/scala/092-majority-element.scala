/**
 * Problem 92: Majority Element (LeetCode 169)
 * Difficulty: Easy
 * Language: Scala
 */
def majorityElement(nums: List[Int]): Int =
  nums.foldLeft((0, 0)) { case ((cand, cnt), n) =>
    if (cnt == 0) (n, 1)
    else if (n == cand) (cand, cnt + 1)
    else (cand, cnt - 1)
  }._1

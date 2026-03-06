/**
 * Problem 152: Combination Sum IV (LeetCode 377)
 * Difficulty: Med
 * Language: Scala
 */
def combinationSum4(nums: Array[Int], target: Int): Int =
  (1 to target).foldLeft(Array.fill(target + 1)(0).updated(0, 1)) { (dp, i) =>
    dp.updated(i, nums.filter(_ <= i).map(n => dp(i - n)).sum)
  }(target)

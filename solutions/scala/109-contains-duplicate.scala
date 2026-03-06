/**
 * Problem 109: Contains Duplicate (LeetCode 217)
 * Difficulty: Easy
 * Language: Scala
 */
def containsDuplicate(nums: Array[Int]): Boolean =
  nums.foldLeft((Set.empty[Int], false)) {
    case ((_, true), _) => (Set.empty, true)
    case ((seen, false), n) => if (seen(n)) (seen, true) else (seen + n, false)
  }._2
